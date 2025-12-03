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


