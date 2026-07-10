

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




公开数据集 / Markdown / GovernedDocument
                      │
                      ▼
          数据适配与结构标准化
   QASPER / CJRC / DuReader / HotpotQA / LongBench
                      │
                      ▼
               GovernedDocument
       文档 → 标题层级 → Block → 来源锚点
                      │
                      ▼
                分块服务层
   fixed / recursive / semantic / hsc_rag
                      │
                      ▼
                  RagChunk[]
   text + title_path + source_blocks + source_anchor
   tags + summary + quality_flags + metadata
            │                         │
            ▼                         ▼
   BM25 / Dense / Hybrid       LLM 语义组织增强
            │              摘要、标签、实体、质量评估
            ▼
   Recall@K / MRR / nDCG / Bad Case
            │
            ▼
   JSON/JSONL 实验产物 → FastAPI → React 看板

  技术栈

  后端使用 Python 3.11、FastAPI、Pydantic 2、LangChain/LangGraph、FAISS、scikit-learn、rank-bm25、jieba、NumPy 和
  Pandas。依赖集中在 requirements.txt。

  前端使用 React 19、TypeScript、Vite 和 lucide-react，配置位于 frontend/package.json。

  项目当前没有数据库。实验结果主要以 JSON、JSONL、CSV 文件保存在 data/processed/，API 通过文件读取和内存缓存向前端提供数
  据。

  后端分层

  1. API 入口

  backend/app/main.py:22 创建 FastAPI 应用，API 分为三类：

  - POST /api/v1/chunk：单文档分块。
  - POST /api/v1/chunk/batch：批量文档分块。
  - POST /api/v1/agent/run：LangChain Agent 编排。
  - /api/overview、/api/metrics、/api/queries、/api/bad-cases：读取评测结果。
  - /api/queries/{query_id}/comparison：查看同一个问题在四种分块策略下的 Top-5 对比。

  2. 核心数据契约

  backend/app/core/schemas.py:38 是整个项目最重要的协议层：

  - SourceAnchor：指向原始数据集、文档、章节、段落或资源文件。
  - GovernedBlock：治理后的最小结构块，包含类型、顺序、标题路径和来源锚点。
  - GovernedQuery：问题、答案以及 gold evidence 映射。
  - GovernedDocument：HSC-RAG 的标准输入。
  - RagChunk：分块后的标准输出。
  - ChunkAgentRequest/Response：在线分块接口契约。
  - LangChainAgentRequest/Response：Agent 接口契约。

  这里明确划分了系统职责：HSC-RAG 不直接负责 PDF/HTML 清洗和术语治理，而是接收已经标准化的 GovernedDocument。

  3. 数据集适配层

  backend/app/adapters/ 将不同数据集转换成统一契约：

  - qasper_adapter.py：英文结构化论文，作为主检索实验。
  - cjrc_adapter.py：中文司法文档。
  - dureader_adapter.py：中文网页问答。
  - hotpotqa_adapter.py：多跳问答。
  - longbench_adapter.py：超长上下文、多选任务。

  适配完成后一般生成：

  governed_documents.jsonl
  blocks.jsonl
  gold_evidence.jsonl
  queries.csv
  conversion_report.json

  4. 分块算法层

  分块器统一接受 GovernedDocument，输出 RagChunk[]：

  - backend/app/chunkers/fixed.py:32：固定窗口基线。
  - backend/app/chunkers/recursive.py:42：递归切分基线。
  - backend/app/chunkers/semantic.py:46：基于句间语义距离的切分。
  - backend/app/chunkers/hsc_rag.py:68：核心的层级结构感知分块。

  HSC-RAG 默认目标长度约为 512 tokens，最小 180，最大 900。它综合以下信号决定边界：

  - title_path 和章节切换。
  - 相邻块语义距离。
  - 当前 chunk 长度。
  - 文档整体结构密度和上下文需求。
  - table、figure、code、formula、list 等受保护块。
  - 中文司法文档的特殊断句规则。

  它还会为边界保存 closing_boundary_decision，记录结构信号、语义距离、边界分数和切分原因，因此算法结果具备可解释性和可回
  溯性。

  5. 分块服务层

  backend/app/services/chunking_service.py:27 通过注册表统一管理四种分块器。API、Agent 和命令行流水线最终都复用这一层。

  服务还生成分块报告，包括：

  - chunk 数量和 token 分布。
  - quality flag 统计。
  - 平均边界分数。
  - 平均语义距离。
  - 语义边界触发次数。
  - 各类切分原因统计。

  6. 检索与评测层

  backend/app/retrievers/ 提供三类检索器：

  - BM25ChunkRetriever：支持英文、中文字符 n-gram 和 jieba 等分词配置。
  - DenseFaissRetriever：支持本地 SentenceTransformer，也支持确定性的 TF-IDF + SVD + FAISS 回退。
  - HybridRetriever：BM25 和 Dense 的加权融合，或 RRF 排名融合。

  离线评测由 scripts/run_retrieval_eval.py:449 执行，主要指标是 Recall@1/3/5、MRR、nDCG@5、Hit Rate 和 Full Recall
  Rate。

  7. Agent 与 LLM 层

  backend/app/services/langchain_agent_service.py:73 将分块能力包装为 LangChain Structured Tools，包括：

  - 检查文档上下文。
  - 单文档分块。
  - 批量分块。
  - 分块后执行 LLM 语义增强。

  这里的设计重点是：大模型不直接决定核心边界。边界仍由确定性分块器产生；LLM 负责工具选择以及分块后的摘要、主题标签、实
  体、完整性评分和可选 QA 样本生成。

  Provider 支持离线 mock 和 openai_compatible，因此可以对接 OpenAI、DeepSeek、通义、SiliconFlow 或本地 vLLM 服务。

  前端结构

  前端目前是一个单页工作台，frontend/src/App.tsx:288 包含两个主要页面：

  - “JSON 分段”：上传 GovernedDocument 或 ChunkAgentRequest JSON，调整分块参数，调用 /api/v1/chunk，展示 chunk 文本、来
    源锚点、质量标记和边界信息。

  - “评估看板”：切换数据集和 BM25/Dense/Hybrid 检索器，查看指标矩阵、bad case、全部问题和四种分块策略的 Top-5 对比。

  frontend/src/api.ts:1 同时定义前端 TypeScript 数据类型和 API 请求函数。前端通过 VITE_API_BASE 配置后端地址；未配置时使
  用同源相对路径。

  离线流水线

  scripts/ 是项目实验流程的主要入口：

  convert_*.py
      数据集 → GovernedDocument / GoldEvidence

  run_chunking.py
      GovernedDocument → 四种策略的 chunks_*.jsonl

  run_retrieval_eval.py
      chunks + gold evidence → 检索指标和逐 query 结果

  run_llm_enrichment.py
      chunks → LLM 摘要、标签、实体、QA

  run_agent_pipeline.py
      将转换、分块、评测、增强串成统一流水线

  validate_*.py
      校验数据契约、chunk 来源完整性和验收指标

  项目定位

  这个仓库当前更接近“分块算法研究平台 + 检索评测平台 + Agent 演示系统”，还不是完整的生产型知识库问答系统。它已经覆盖数据
  转换、分块、检索评测、LLM 增强、API 和可视化，但暂时没有持久化向量库、用户体系、文档管理、在线索引更新、检索生成式问答
  和生产部署配置。

  最合适的阅读顺序是：backend/app/core/schemas.py:38 → backend/app/chunkers/hsc_rag.py:68 → backend/app/services/
  chunking_service.py:107 → scripts/run_agent_pipeline.py:141 → backend/app/main.py:52 → frontend/src/App.tsx:288。


``` mermaid
graph TD
    %% Entry Point
    chunk_doc["chunk_document<br/>(公开入口)"] --> adaptive_cfg["_adaptive_config_for_document<br/>(自适应配置)"]
    chunk_doc --> init_chunk["_build_initial_chunks<br/>(构建初始分块)"]
    chunk_doc --> merge_short["_merge_short_chunks<br/>(后置合并小块)"]
    chunk_doc --> renumber["_renumber<br/>(最终对分块重新编号)"]

    %% Adaptive Config Sub-graph
    adaptive_cfg --> doc_stats["_document_boundary_stats<br/>(统计文档特征)"]
    adaptive_cfg --> cfg_snap["_config_snapshot<br/>(备份快照)"]
    doc_stats --> percentile["_percentile<br/>(计算分位数)"]
    doc_stats --> rate["_rate<br/>(计算频率)"]
    doc_stats --> sem_sim["_semantic_similarity<br/>(评估相邻语义相似度)"]

    %% Initial Chunking Sub-graph
    init_chunk --> flush["flush<br/>(闭包: 打包缓冲区)"]
    init_chunk --> same_title["_same_title_path<br/>(判断同一章节)"]
    init_chunk --> score_boundary["_score_boundary<br/>(评分并判定边界)"]
    
    score_boundary --> struct_sig["_structure_signal<br/>(结构变化信号)"]
    score_boundary --> sem_sim
    score_boundary --> policy_meta["_boundary_policy_metadata<br/>(边界元数据)"]

    %% Similarity computation
    sem_sim --> tok_cnt["_token_counter<br/>(文本词频袋构建)"]

    %% Merging Sub-graph
    merge_short --> merge_allow["_merge_allowed<br/>(合法性检查)"]
    merge_short --> merge_pair["_merge_pair<br/>(物理合并两块)"]

    style chunk_doc fill:#2E8B57,stroke:#fff,stroke-width:2px,color:#fff
    style init_chunk fill:#1F77B4,stroke:#fff,stroke-width:1px,color:#fff
    style score_boundary fill:#1F77B4,stroke:#fff,stroke-width:1px,color:#fff

```
