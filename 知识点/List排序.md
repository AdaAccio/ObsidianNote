根据时间排序
```java
Collections.sort(list, Comparator.comparing(WorkInfoTab::getCreatedAt, (t1, t2) -> t2.compareTo(t1)));
```
[[Comparator]]

1. **`(t1, t2) -> t2.compareTo(t1)`**
    
    - 这是一个 **Lambda 表达式**，定义了一个比较器（`Comparator`）。
        
    - `t2.compareTo(t1)` 表示**降序排序**（`t1` 和 `t2` 互换位置，使得较大的时间排在前面）。


#java 