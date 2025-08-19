
```java
Collections.sort(list, Comparator.comparing(WorkInfoTab::getCreatedAt, (t1, t2) -> t2.compareTo(t1)));
```
