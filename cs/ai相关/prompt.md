
## 2 规定输出格式

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
