
#java #lombok


需要加上lombok依赖和 `@builder` 注解
```java
Task task = new Task.builder().
	.type(1) 
	.content("处理一下这个任务") 
	.status(0) 
	.finishDate(new Date()) 
	.build();
```

