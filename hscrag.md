

## 1 一、 核心概念：这个项目是解决什么问题的？

在做大模型问答（RAG - 检索增强生成）时，我们不能把一本 10 万字的书直接塞给大模型（这样它会记不住，或者超出最大字数限制）。所以我们需要把大文档**切成一个个小碎片**（叫做 **Chunk**），然后根据用户的提问（Query），去检索出最相关的几个 Chunk 喂给大模型。

**通常的做法（传统切分）**：
*   **固定窗口（Fixed Window）**：每 500 个字切一刀。缺点：可能会把一句话从中间切断，或者把表格、代码切得支离破碎。
*   **递归切分（Recursive Split）**：按段落、句号递归切。稍微聪明一点，但依然不理解文档的结构。

**本项目 HSC-RAG 的做法**：
它是一个 **“结构感知”的分段器**。它要求输入的数据是已经规范好的结构化文档（`GovernedDocument`），里面包含一堆排好序、带有类型（标题、段落、表格、代码、列表等）的块（`GovernedBlock`）。HSC-RAG 会利用这些**层级标题路径、块的类型**来聪明地切分，保证切出来的块既不超过长度限制，又最大程度保留语义的完整性（比如把表格完整保留，把属于同一个子章节的段落尽量聚在一起）。

---

## 2 二、 项目的整体架构

项目由**后端 (backend)**、**前端 (frontend)**、**数据适配与评估脚本 (scripts)** 三大支柱组成：

```text
HSC_RAG
├── backend/            # 后端：提供 API 接口、实现分段算法和检索器
├── frontend/           # 前端：React 页面，可视化展示分段效果和对比
├── scripts/            # 脚本：用于数据集格式转换、运行自动评估
└── data/               # 数据：存放原始和转换后的数据集（QASPER, CJRC 等）
```

接下来我们分别拆解这三个核心部分。

---

## 3 三、 详细功能拆解

### 3.1 后端 (backend) —— 算法和服务的核心

后端采用 **FastAPI** 框架（一个高性能的 Python Web 框架），它的主要结构如下：

*   **数据模型契约 ([schemas.py](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/core/schemas.py))**
    *   定义了前后端以及算法流转的统一数据格式。
    *   `GovernedDocument`：已经被结构化治理的文档，包含许多 `GovernedBlock`（可以是 `title`, `paragraph`, `table`, `code` 等类型，且知道它的父标题路径 `title_path`）。
    *   `RagChunk`：切分后的碎片，带有元数据、质量标记（如 `short_chunk`、`long_chunk` 等）。
*   **分段算法模块 ([backend/app/chunkers/](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/chunkers))**
    *   [fixed.py](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/chunkers/fixed.py)：固定长度切分（Baseline 1）。
    *   [recursive.py](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/chunkers/recursive.py)：递归文本切分（Baseline 2）。
    *   [semantic.py](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/chunkers/semantic.py)：语义相似度切分（通过 TF-IDF 句间距离，Baseline 3）。
    *   [hsc_rag.py](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/chunkers/hsc_rag.py)：**本项目的主角**。它会根据 `title_path`（标题层级路径）和 Block 类型进行智能合并与拆分。
*   **检索器模块 ([backend/app/retrievers/](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/retrievers))**
    *   切完块后，我们需要模拟 RAG 系统的检索阶段，看切出的块好不好搜。
    *   `bm25.py`：基于词频匹配的传统检索（比如搜关键词）。
    *   `dense_faiss.py`：基于向量数据库的稠密向量检索（通过 TF-IDF + SVD 降维，在本地用 FAISS 加速检索，无需连外网）。
    *   `hybrid.py`：混合检索（把 BM25 和 Dense 融合起来，往往效果最好）。
*   **主服务入口 ([main.py](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/backend/app/main.py))**
    *   暴露 HTTP 接口，比如接收一个文档，返回它分段后的 Chunk 列表；或者返回历史评估结果。

---

### 3.2 前端 (frontend) —— 实验看板与效果可视化

前端使用 **Vite + React + TypeScript** 构建，核心用于直观地向用户展示不同分段策略的优劣：

*   **App.tsx ([App.tsx](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/frontend/src/App.tsx))**
    *   前端主界面。它会向后端发送请求，拉取测试数据。
    *   提供了 **JSON 上传** 区域，你可以直接把一个 `GovernedDocument` 文件上传上来，调整参数，实时看到不同分段策略的切分结果。
    *   提供了 **Bad Case 对比页面**：针对同一个用户的提问，如果在某种分段下检索错了（比如切碎了没搜出来，Recall 变低了），它会在前端把 Fixed, Recursive, Semantic, HSC-RAG 四种方案的 Top-5 检索结果并排比对展示，非常直观。
*   **api.ts ([api.ts](file:///d:/NEU/实训/period2/HSC-RAG-Hierarchical-Structure-aware-Chunking-for-RAG/frontend/src/api.ts))**
    *   封装了对 FastAPI 后端的 API 请求，用来进行数据通信。

---

### 3.3 脚本与数据管道 (scripts & data) —— 离线实验与评估

一个学术/实训项目最看重的是**数据评估指标**（用数据说话）。这就需要离线测试脚本：

*   **数据适配器 (Adapters)**
    *   各个学术数据集格式千奇百怪。在 `backend/app/adapters` 里有 `qasper_adapter.py`、`cjrc_adapter.py` 等。
    *   它们的作用是把原始数据集格式读进来，标准化转换成我们定义的统一格式 `GovernedDocument`。
*   **运行脚本 (`scripts/`)**
    *   `convert_qasper.py` / `convert_cjrc.py`：运行适配器把数据集格式化并保存到 `data/processed/`。
    *   `run_retrieval_eval.py`：**最核心的评测脚本**。它会对分段后的 chunks 建立索引，并用测试集里的问题进行检索，计算出学术界通用的 RAG 检索指标：
        *   **Recall@1/3/5**：检索出的前 1/3/5 个块里，包不包含正确答案（包含率越多越好）。
        *   **MRR (Mean Reciprocal Rank)**：正确答案排在第几名，排得越靠前分数越高。
        *   **nDCG@5**：多标签排序的归一化折损累计增益，评估前 5 个结果的整体相关性顺序。
    *   `run_longbench_mcq_eval.py`：进阶实验，把检索出来的 chunks 给下游大模型，看大模型做选择题的正确率。
