
#java 

```java
Task task = new Task.TaskBuilder(99, "紧急任务") 
	.type(1) 
	.content("处理一下这个任务") 
	.status(0) 
	.finishDate(new Date()) 
	.build();
```
