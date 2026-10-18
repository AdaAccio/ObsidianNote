
## 1 论文相关

 Beyond Chunk-Then-Embed: A Comprehensive Taxonomy and Evaluation of Document Chunking Strategies for Information Retrieval
超越块式嵌入：信息检索中文档分块策略的综合分类与评估

2026年7月发表在SIGIR ’26 论文集


### 1.1 摘要

将现有策略统一为两个关键维度：
（1）分割方法segmentation methods，包括基于结构的方法（固定大小、基于句子和基于段落的方法）fixed-size, sentence-based, and paragraph-based 以及语义知情和以LLM为导的方法;以及
（2）嵌入范式embedding paradigms，决定分块相对于嵌入的时机(timing)（嵌入前与上下文化分区pre-embedding chunking vs. contextualized chunking）。我们的再现在两种不同检索环境中评估了这些方法：文档内检索（大海捞针）和语料库检索（标准信息检索任务）。