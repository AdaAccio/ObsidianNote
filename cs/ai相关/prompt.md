#ai
## 1 规定输出格式

在service层，设定一个init方法，可以规定大模型的格式化输出

```java
public void init() {  
    //全部有效语言  
    languageTabList = sysLanguageMapper.selectList(Wrappers.<SysLanguageTab>lambdaQuery().eq(SysLanguageTab::getStatus, 1));  
  
    //以json模式输出  
    String jsonSchema =  {        
    "$schema": "http://json-schema.org/draft-07/schema#",        
	"type": "object",
	"properties": {
			"image": {
				 "type": "string"
				 }, 
			"languageList": {
				 "type": "array",
				 "items": { 
					 "type": "object", 
					 "properties": {
						 "languageContent": {
							 "type": "string" 
							  }, 
					 "languageId": { 
						"type": "string"
						}
					},
				"additionalProperties": false, 
				 "required": [ 
					"languageContent", 
					"languageId"
				] 
			} 
		 },           
		"phoneticAlphabet": {                
			"type": "string" 
		},            
		"sentence": {                
			"type": "string"           
		 },           
		  "word": {
			"type": "string"           
			 }       
		 },        
		 "additionalProperties": false, 
		"required": [            
			"languageList",            
			"phoneticAlphabet",            
			"sentence",            
			"word"        
		]    
	}""";
    this.openAiChatOptions = OpenAiChatOptions.builder()  
            .responseFormat(new ResponseFormat(ResponseFormat.Type.JSON_SCHEMA, jsonSchema))  
            .build();
```
调用`openAiChatOptions` 即可使用对应的格式 即

```java
public AiRelatedWordVO getRelatedWords(String word){  
    ChatClient chatClient = ChatClient.builder(chatModel).build();  
    try{  
        List<String> userMessage=new ArrayList<>(){{  
            add(StrUtil.format("You need to generate two related words for the word \"{}\".", word));  
            add("your response should in this json format."  
                    + StrUtil.format("{\"word\":\"{the origin word}\",\"relatedWord\":[\"a related word\",\"another related word\"]}",  
                    word));  
            add("you should copy my few-shot,the related word of \"dog\" is \"cat\" and \"bird\", the related word of \"blue\" is \"red\" and \"yellow\",, the related word of \"stand\" is \"walk\" and \"sit\"");  
        }};  
        Prompt userPrompt = new Prompt(String.join(" ", userMessage),this.openAiChatOptions2);  
  
        AiRelatedWordVO result = chatClient.prompt(userPrompt)  
                .system(promptSystemSpec -> promptSystemSpec  
                        .text("You are an English vocabulary learning assistant")  
                )  
                .call()  
                .entity(AiRelatedWordVO.class);  
  
        return result;  
  
    }catch (NonTransientAiException e) {  
        throw MyBizException.BUSINESS_FAULT.withMessage(e.getMessage());  
    }  
  
}
```
在使用AI的方法中，仍然正常初始化 `ChatClient` 

在设定prompt的过程中，调用这个结构

```java
Prompt userPrompt = new Prompt(String.join(" ", userMessage),this.openAiChatOptions2);
```

格式那堆东西叫做 `JSONSchema` ，可以用在线工具生成，不过要注意使用 `Draft-7` 

如果要存入一个对应的类中，则加上 `.entity(xxx.class)` ,不用的话就加上 `.context()` 

这段代码的prompt还用到了 [[few-shot]]