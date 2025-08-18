## 2 数据库



## 3 功能

## 4 各种配置

### 4.1 MyBatis-plus

代码生成器

需要的依赖

前两个版本要对齐

```xml
 <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.3.0</version>
        </dependency>
<dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.0</version>
</dependency>
<dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.0</version>
        </dependency>
 
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter-test</artifactId>
            <version>3.0.5</version>
            <scope>test</scope>
        </dependency>
```



```java
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

public class CodeGenerator {

    public static void main(String[] args) {
        // 全局配置
        GlobalConfig globalConfig = new GlobalConfig();
        globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java") // 设置输出目录
                .setAuthor("Your Name") // 设置作者
                .setOpen(false) // 设置生成后是否自动打开目录
                .setFileOverride(true) // 设置文件存在时是否覆盖
                .setServiceName("%sService") // 设置Service接口名后缀
                .setIdType(IdType.AUTO) // 设置主键生成策略
                .setSwagger2(true); // 设置是否生成Swagger注解

        // 数据源配置
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL) // 设置数据库类型
                .setUrl("jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&serverTimezone=UTC") // 数据库连接URL
                .setUsername("root") // 数据库用户名
                .setPassword("password") // 数据库密码
                .setDriverName("com.mysql.cj.jdbc.Driver"); // 数据库驱动类名

        // 策略配置
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setInclude("user", "order") // 指定需要生成代码的表名
                .setNaming(NamingStrategy.underline_to_camel) // 设置表名转类名策略
                .setColumnNaming(NamingStrategy.underline_to_camel) // 设置列名转属性名策略
                .setEntityLombokModel(true) // 设置实体类使用Lombok模型
                .setRestControllerStyle(true) // 设置Controller使用REST风格
                .setTablePrefix(new String[]{"tbl_"}); // 设置表名前缀

        // 包配置
        PackageConfig packageConfig = new PackageConfig();
        packageConfig.setParent("com.example") // 设置父包名
                .setMapper("mapper") // 设置Mapper接口所在的子包名
                .setEntity("entity") // 设置实体类所在的子包名
                .setController("controller") // 设置Controller所在的子包名
                .setService("service") // 设置Service所在的子包名
                .setXml("mapper"); // 设置Mapper XML文件所在的子包名

        // 模板配置
        TemplateConfig templateConfig = new TemplateConfig();
        templateConfig.setXml(null) // 不生成XML文件
                .setController("templates/controller.java.vm") // 设置Controller模板路径
                .setEntity("templates/entity.java.vm") // 设置实体类模板路径
                .setMapper("templates/mapper.java.vm"); // 设置Mapper接口模板路径

        // 整合配置
        AutoGenerator autoGenerator = new AutoGenerator();
        autoGenerator.setGlobalConfig(globalConfig)
                .setDataSource(dataSourceConfig)
                .setStrategy(strategyConfig)
                .setPackageInfo(packageConfig)
                .setTemplate(templateConfig);

        // 执行生成
        autoGenerator.execute();
    }
}
```

如

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.TemplateConfig;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

public class SggCodeGenertor {
    public SggCodeGenertor() {
    }

    public static void main(String[] args) {
        GlobalConfig globalConfig = new GlobalConfig();
        globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java").setAuthor("AdaAccio").setOpen(false).setFileOverride(true).setServiceName("%sService").setIdType(IdType.AUTO).setSwagger2(true);
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL).setUrl("jdbc:mysql://localhost:3306/board_demo_database?").setUsername("root").setPassword("040907").setDriverName("com.mysql.cj.jdbc.Driver");
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setInclude(new String[]{"user_account", "user_info", "article"}).setNaming(NamingStrategy.underline_to_camel).setColumnNaming(NamingStrategy.underline_to_camel).setEntityLombokModel(true).setRestControllerStyle(true).setTablePrefix(new String[]{"tbl_"});
        PackageConfig packageConfig = new PackageConfig();
        packageConfig.setParent("com.example.board_demo").setMapper("mapper").setEntity("entity").setController("controller").setService("service").setXml("mapper");
        TemplateConfig templateConfig = new TemplateConfig();
        templateConfig.setXml((String)null).setController("templates/controller.java.vm").setEntity("templates/entity.java.vm").setMapper("templates/mapper.java.vm");
        AutoGenerator autoGenerator = new AutoGenerator();
        autoGenerator.setGlobalConfig(globalConfig).setDataSource(dataSourceConfig).setStrategy(strategyConfig).setPackageInfo(packageConfig).setTemplate(templateConfig);
        autoGenerator.execute();
    }
}

```

#### 4.1.1 手搓

- mapper

  ###### 定义Mapper接口

  创建`DeptMapper`接口，让其继承`BaseMapper`即可

  每个Mapper接口上需要添加`@Mapper`注解，Mapper接口才会被扫描到然后创建对象放到IoC容器中

  ```java
  @M
  public interface UserAccountMapper extends BaseMapper<UserAccountTab> {
  }
  ```

  

### 4.2 redis

缓存用的 和我虚拟机上ubuntu连着

启动redis服务 



依赖如下

```xml
 <!-- Spring Data Redis -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
```

配置文件如下

```yaml
    
```

tab不能用resource注入 它不是bean

2025-08-14T16:31:44.211+08:00 ERROR 32336 --- [nio-8888-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.example.board_demo.mapper.UserAccountMapper.insert] with root cause

其实是tab里面的名称和数据库里面的没有对齐导致的 一开始还以为是依赖的问题

总之简直是害死我了

**ApiFox相关** 环境变量填程序的端口

我的IP是 192.168.2.188

> 报错：
>
> org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'redisLockAspect': Injection of resource dependencies failed

目前诊断为Redis没连上导致的，我的天哪不要再改配置文件了好吗好的。我的本地映射里面有路径

## 5 groovy代码生成器

groovy是写脚本的

先把 `template/dao/mybatisplus/jMyBatisPlus.groovy` 复制下来 

![image.png|395x492](https://gitee.com/xin_accio/pic-go-images/raw/master/20250818163305079.png)


然后进去 把groovy文件粘贴到这个目录

命令：

`groovy .\jCoder.groovy`

然后跟着敲就可以了
第一次创建tab的时候需要这么操作一遍点脚本，记得把数据库刷新一下哦
entity处要写上带tab的格式
## 6 Redis

我这主要用来存存token

```java
public void attachAdminToken(UserAccountDetailVO vo) {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");

        String bearer = (String) redisTemplate.opsForValue().get(Constants.ADMIN_BEARER + vo.getUserid());

        String newBearer = Constants.BEARER_ADMIN + uuid;

        vo.setToken(newBearer);
        redisTemplate.opsForValue().setIfAbsent(newBearer, vo, 2, TimeUnit.DAYS);

        redisTemplate.opsForValue().set(Constants.ADMIN_BEARER + vo.getUserid(), newBearer, 2, TimeUnit.DAYS);
    }
```

就是搞一个token，一段时间内免登录（其实就是不用动一下就登陆注册555）

## 7 日志与错误

日志都生成好了

报错需要搞一个文件出来

![image-20250815172538745](https://gitee.com/xin_accio/pic-go-images/raw/master/image-20250815172538745.png)

继承 `BizException`

代码如下

```java
package com.dadibadi.core.common.exception;

import com.venusoft.developer.common.exception.BizException;

public class MyBizException extends BizException {
    public MyBizException(int code, String message) {
        super(code, message);
    }

    public static final BizException ACCOUNT_NOT_EXIST_ERROR = new BizException(7000, "账号不存在");
    public static final BizException PASSWORD_ERROR = new BizException(7001, "密码错误");

    public static final BizException EMAIL_EXIST_ERROR = new BizException(7001, "email已注册");
}

```

这样错误就能throw给接口啦

## 8 登陆注册

### 8.1 登录

登录的本质是get查询 每次登录都生成一个新token 存到redis中

coze： pat_j5CwAbMGzY1mI1p6AmjBRzkizA6lnz155WuRCrt06dQ6QuEYilIbWUgdmkHT8KbC

### 8.2 注册

注册更简单，存起来就完事了，前端加油

### 8.3 关于Token

**JWT** :由三部分组成

header：包含token的类型和加密算法
payload：包含token的内容
signature：通过密钥将前两者加密得到最终的token
这三部分中间使用 " . " 分隔开，并且都会使用Base64编码方式编码,如下
eyJhbGc6IkpXVCJ9.eyJpc3MiOiJCIsImVzg5NTU0NDUiLCJuYW1lnVlfQ.SwyHTf8AqKYMAJc
#### 8.3.1 保存

```java
public void attachAdminToken(UserAccountDetailVO vo) {  
    String uuid = UUID.randomUUID().toString().replaceAll("-", "");  
  
    String bearer = (String) redisTemplate.opsForValue().get(Constants.ADMIN_BEARER + vo.getUserid());  
  
    String newBearer = Constants.BEARER_ADMIN + uuid;  
  
    vo.setToken(newBearer);  
    redisTemplate.opsForValue().setIfAbsent(newBearer, vo, 2, TimeUnit.DAYS);  
  
    redisTemplate.opsForValue().set(Constants.ADMIN_BEARER + vo.getUserid(), newBearer, 2, TimeUnit.DAYS);  
}

```
#### 8.3.2 校验


## 9 用户信息

各种接口随随便便就生成出来了 主要还是有一个

### 9.1 模糊查询

```java
MPJLambdaWrapper<UserInfoTab> wrapper = new MPJLambdaWrapper<UserInfoTab>()
                .like(UserInfoTab::getNickName,qo.getNickName());
```

这个like很不错

## 10 作品信息

可能会有的需求：
根据id查作品（这个是必需的 一对多）
模糊查找 按照时间排序
存 需要顺手把时间也给存进去
图or文 这个也有需求 0是文章 1是图片