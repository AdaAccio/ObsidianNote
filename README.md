# NeuvifuriBullentinboard Server

## 1 介绍

域名为：
http://www.blog.gamfun.com 
无需部署即可直接查看项目

基于标准spring boot构建
前端：React
后端：SpringBoot+MybatisPlus

## 2 软件架构

### 2.1 开发环境

- jdk17
- idea 2023.2
- groovy3.0.7以上
其他工具
- Redis 8.2.0
- mysql 8.0
- 阿里云服务器/对象存储oss
## 3 配置说明

### 3.1 maven设置

在 `C:\Users\用户\.m2` 调整maven的settings.xml设置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"

          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">

  <mirrors>
    <mirror>

        <id>aliyunmaven</id>

        <mirrorOf>*,!spring-snapshots,!central-portal-snapshots</mirrorOf>

        <name>阿里云公共仓库</name>

        <url>https://hub.t2.dadibadi.com/repository/maven-public/</url>

    </mirror>

  </mirrors>

</settings>

```

### 3.2 springboot配置文件设置

若要使用本地数据库 在 `application.yml` 中，修改相应的IP地址
（不修改也可以，即连接服务器上的远程数据库）

``` yml
datasource:  
  type: com.alibaba.druid.pool.DruidDataSource  
  driver-class-name: com.mysql.cj.jdbc.Driver  
  url: jdbc:mysql://172.25.39.5:3306/board_demo  //修改为本机IP以及端口
  username: root  
  password: joyous@11739  
data:  
  redis:  
    database: 0  
    host: 172.25.39.5  //修改为本机IP以及端口
    port: 6379  
    password: joyous@11739  
    timeout: 5000  
    lettuce:  
      pool:  
        max-active: 8  
        max-idle: 8  
        min-idle: 2  
        max-wait: 1000  
      shutdown-timeout: 1000
```
### 3.3 
