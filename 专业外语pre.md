
## 1 论文相关

 Beyond Chunk-Then-Embed: A Comprehensive Taxonomy and Evaluation of Document Chunking Strategies for Information Retrieval
超越块式嵌入：信息检索中文档分块策略的综合分类与评估

2026年7月发表在SIGIR ’26 论文集


### 1.1 摘要

将现有策略统一为两个关键维度：
（1）分割方法segmentation methods，包括基于结构的方法（固定大小、基于句子和基于段落的方法）fixed-size, sentence-based, and paragraph-based 以及语义知情和以LLM为导的方法;以及
（2）嵌入范式embedding paradigms，决定分块相对于嵌入的时机(timing)（嵌入前与上下文化分区pre-embedding chunking vs. contextualized chunking）。我们的再现在两种不同检索环境中评估了这些方法：文档内检索（大海捞针）和语料库检索（标准信息检索任务）。

### 1.2 四个设问

RQ1 不同分割方法在标准语料库内检索中有何不同？我们在标准BEIR基准测试上，利用预嵌入分块评估固定大小、句子、段落、语义和LLM引导的分割方法。

RQ2 分割方法是否能在检索任务中泛化？我们将相同的分段方法应用于文档内检索，测试当检索限制为单个文档时，语料库内检索的相对强度是否成立。

RQ3 上下文化分块是否能在不同配置之间带来一致的改进？我们将上下文化分块应用于RQ1所有分割方法，涵盖两个检索任务，以确定其是否具有普遍效益。

RQ4 块大小如何影响检索效果？不同的分割方法会产生不同大小的块，但以往的研究并未控制过这一变量。这引出了一个简单的问题：效果差异是反映细分质量，还是仅仅反映块大小？在极端情况下，将整个文档视为单一块，保证了文档内设置的检索（因为相关信息确实存在于该块中），从而人为地抬高了效率。在另一极端，非常大的块减少了上下文分块和