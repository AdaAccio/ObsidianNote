

# 1 约束

- PK 主键 一般用于ID 不能有NULL
    
- NN 非空键 不能有NULL
    
- UQ 唯一键 所有值都是唯一的 不能出现重复值
    
- AI 自增键 自动生成唯一递增值 每个表中最多有一个

# 2 语句


加入列的语句
```mysql
ALTER TABLE work_info add COLUMN description varchar(128);
```

删除列的语句
假设有一个名为_posts_的表，其中包含一个名为_excerpt_的列
```mysql
ALTER TABLE posts DROP COLUMN excerpt;
```