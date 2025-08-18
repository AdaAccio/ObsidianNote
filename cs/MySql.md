

# 约束

- PK 主键 一般用于ID 不能有NULL
    
- NN 非空键 不能有NULL
    
- UQ 唯一键 所有值都是唯一的 不能出现重复值
    
- AI 自增键 自动生成唯一递增值 每个表中最多有一个

# 语句


这是个加入列的语句
```mysql
ALTER TABLE work_info add COLUMN description varchar(128);
```
