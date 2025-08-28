# 1 常用命令

`cd ..` 轻松返回上一级

`apt install xxx` 下载常用

`sz 文件路径` 下载到主机中 这个是给secureCRT用的

`rz` 与sz类似，从主机选文件下载到服务器中，一般是下载到根目录里面

## 1 用户

创建一个用户 就可以在这里面下载文件了！

![image.png](https://gitee.com/xin_accio/pic-go-images/raw/master/20250827180538609.png)



app的密码是123

退出某个用户，回退到管理员模式

```shell
exit
```



## 2 docker

### 2.1 配置docker镜像加速

打开 daemon.json 文件

```
vim /etc/docker/daemon.json
```

输入以下内容并保存

```{
  "registry-mirrors": ["http://hub-mirror.c.163.com",  "https://docker.mirrors.ustc.edu.cn"]
}
```

这里的链接可以换成任何要用的

重新加载配置信息及重启 Docker 服务

```
# 重新加载某个服务的配置文件
sudo systemctl daemon-reload
# 重新启动 docker
sudo systemctl restart docker

```

进镜像的目录 先执行 `. ./99` tabel 的命令，连接网络
然后选要下载的镜像，cd进去 然后docker-compose up -d

#### 2.1.1 读取数据库文件

真的太狼狈了 但我连不上 于是使用rz大法

```shell
docker cp yyy.sql mysql:/yyy.sql

# 2. 创建数据库
docker exec -it mysql mysql -h 192.168.6.88 -uroot -p12345 
mysql> create database yyy;
mysql> use yyy;

# 3.登陆控制台执行source 命令
mysql> source yyy.sql

```


### 2.2 迁移数据库

[Docker迁移Mysql到另一台服务器上 - Rzk - 博客园](https://www.cnblogs.com/rzkwz/p/16193144.html)

[[1181]linux两台服务器之间传输文件和文件夹-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2336817)

涉及到

传文件之前需要先添加一个

具体流程是，将容器存为镜像，然后打包下载，再上传过去
## 3 路径操作

返回上一级

```shell
cd ..
```

到根目录下的文件夹

```shell
cd /home #举例
```

到目录下的其他文件夹
距离：home下有子文件夹app

```shell
cd app
```

展示该目录下的内容

```shell
ll
```

删除空文件夹

```shell
rmdir 文件夹名
```

删除非空文件夹

```shell
rm -r 文件夹名 #递归删除文件夹中所有文件
	-f #强制删除
	-i #删除前询问
```


## 4 编译 运行


### 4.1 spring-boot项目

在项目根目录下 

```shell
mvn clean compile
```

成功后，使用maven的spring-boot插件

```
mvn spring-boot:run
```

↑这个不能用
用这个

```shell
mvn -f ../pom.xml clean package -pl ${MODULE}-application -am -Dmaven.test.skip=true
```

{MODULE}里面填写的是主模块名

进模块中找到jar包，运行

