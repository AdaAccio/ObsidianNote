
环境：
- IDEA2023
- maven(哪个版本我忘了，建议3.8.5以上)
- JDK17

## 1 JDK

下载JDK17，在IDEA中，点击file-project structure
![image.png|425x356](https://gitee.com/xin_accio/pic-go-images/raw/master/20251201214709835.png)

选这个17（第一次选需要添加sdk）
![image.png|700x553](https://gitee.com/xin_accio/pic-go-images/raw/master/20251201214934688.png)


## 2 maven配置

[Maven如何配置阿里云仓库/国内镜像_maven配置阿里云镜像-CSDN博客](https://blog.csdn.net/i826056899/article/details/145702749)
想下得快点可以参考这个博客，修改settings.xml配置文件，配一个阿里云镜像
在底下命令行里面输入 mvn compile
![image.png|700x267](https://gitee.com/xin_accio/pic-go-images/raw/master/20251201215149890.png)
点击右侧maven的图标，点这里刷新一下
![image.png|700x372](https://gitee.com/xin_accio/pic-go-images/raw/master/20251201215255884.png)
再点这个，就可以跑了
![image.png](https://gitee.com/xin_accio/pic-go-images/raw/master/20251201215351881.png)
