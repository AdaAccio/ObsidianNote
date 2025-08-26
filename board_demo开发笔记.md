## 1 数据库



## 2 功能

## 3 各种配置

### 3.1 MyBatis-plus

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

#### 3.1.1 手搓

- mapper

  ###### 定义Mapper接口

  创建`DeptMapper`接口，让其继承`BaseMapper`即可

  每个Mapper接口上需要添加`@Mapper`注解，Mapper接口才会被扫描到然后创建对象放到IoC容器中

  ```java
  @M
  public interface UserAccountMapper extends BaseMapper<UserAccountTab> {
  }
  ```

  

### 3.2 redis

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

## 4 groovy代码生成器

groovy是写脚本的

先把 `template/dao/mybatisplus/jMyBatisPlus.groovy` 复制下来 

![image.png|395x492](https://gitee.com/xin_accio/pic-go-images/raw/master/20250818163305079.png)


然后进去 把groovy文件粘贴到这个目录

命令：

`groovy .\jCoder.groovy`

然后跟着敲就可以了
第一次创建tab的时候需要这么操作一遍点脚本，记得把数据库刷新一下哦
entity处要写上带tab的格式
## 5 Redis

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

## 6 日志与错误

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

## 7 登陆注册

### 7.1 登录

登录的本质是get查询 每次登录都生成一个新token 存到redis中

coze： pat_j5CwAbMGzY1mI1p6AmjBRzkizA6lnz155WuRCrt06dQ6QuEYilIbWUgdmkHT8KbC

### 7.2 注册

注册更简单，存起来就完事了，前端加油

### 7.3 关于Token

**JWT** :由三部分组成

header：包含token的类型和加密算法
payload：包含token的内容
signature：通过密钥将前两者加密得到最终的token
这三部分中间使用 " . " 分隔开，并且都会使用Base64编码方式编码,如下
eyJhbGc6IkpXVCJ9.eyJpc3MiOiJCIsImVzg5NTU0NDUiLCJuYW1lnVlfQ.SwyHTf8AqKYMAJc

 
#### 7.3.1 保存

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
#### 7.3.2 校验
需要 [[拦截器]] 先不写了
并且还需要[[SpringSecurity]] 的相关知识
此项目使用过滤器实现的

设置需要token才能放行之后遇到了无法导入接口文档的问题
![image.png|318x128](https://gitee.com/xin_accio/pic-go-images/raw/master/20250819163603925.png)

解决方法：

```java
.requestMatchers(  
        ...
        "/work/api-work-info-user",  
        "/work/api-work-info-search",  
        "/v3/api-docs"  
).permitAll()  
.anyRequest().authenticated()
```
## 8 用户信息

各种接口随随便便就生成出来了 主要还是有一个

### 8.1 模糊查询

```java
MPJLambdaWrapper<UserInfoTab> wrapper = new MPJLambdaWrapper<UserInfoTab>()
                .like(UserInfoTab::getNickName,qo.getNickName());
```

这个like很不错

## 9 作品信息

可能会有的需求：
根据id查作品（这个是必需的 一对多）
模糊查找 按照时间排序
存 需要顺手把时间也给存进去
图or文 这个也有需求 0是文章 1是图片
查询之后给[[List排序]]

### 9.1 自动生成时间戳

> [!NOTE]
> Mybatis-plus注解实现方法
> 
> 前提：需要数据类型为datetime
> 
> 方法：mybatis-plus自动填充字段
> 
> 实体类中 需要加上注解  `@TableField(fill = FieldFill.INSERT)`
> 
> 再创建一个类 实现 `MetaObjectHandler`  接口 并且重写 `insertFill` 和 `updateFill` 方法。

上述方法很失败，并且对我的项目造成了伤害，我再也不会用了。我自己的ICommonResult类并不能处理date，并且mybatis-plus的updateById方法有问题，于是我决定在数据库中实现一下

使用mysql语句 [[MySql#^f467e4]] 一句话解决 省时省力 ==不过需要注意传参数不能传入 `created_at` 否则会把输入的日期存进去==



## 10 管理员相关

管理员要做的事：

删除文章 怎么删都行

更改用户的member_flag

删除账号

需要有新增一张表，把发来申请的存起来

## 11 前端

AI速跑 遇到问题

```
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

上网查了发现是很常见的问题，[[跨域]]问题。

AI跑一遍，在前端代理服务器把这个问题解决之后，遇到了新问题

![image.png|445x269](https://gitee.com/xin_accio/pic-go-images/raw/master/20250820104152315.png)

其实是地址写错了 给它配到8888之后又连不上了，并且在 `SpringSecurityConfig` 中没有放行

所以在后端新加了配置，放行cors

```java
@Configuration

public class CorsConfig implements WebMvcConfigurer {

@Override

public void addCorsMappings(CorsRegistry registry) {

registry.addMapping("/**")

.allowedOrigins("*")

.allowedMethods("GET", "POST", "PUT", "DELETE")

.allowedHeaders("*")

.allowCredentials(true)

.maxAge(3600);

}

}
```

还是不行

接口返回错误是

```
untimeExceptionWhen allowCredentials is true, allowedOrigins cannot contain the special value \"*\" since that cannot be set on the \"Access-Control-Allow-Origin\" response header. To allow credentials to a set of origins, list them explicitly or consider using \"allowedOriginPatterns\" instead.
```

是这句话的问题

```java
.allowedOrigins("*")
```

原配置为corsConfiguration.addAllowedOrigin ("*")，需改为corsConfiguration.addAllowedOriginPattern ("*")。 这表明SpringBoot 2.4+更改了对AllowedOrigin的处理方式，不允许使用通配符。

但是 `addAllowedOriginPattern ("*")` 没有 遂用的 

```java
.allowedOriginPatterns("*")
```

然后解决了

又遇到问题，token不好使！

先去控制台里面看

![image.png|414x335](https://gitee.com/xin_accio/pic-go-images/raw/master/20250820152551495.png)

`Authorization` 这里 头上有个Bearer

这是咱们AI前端干的好事

![image.png|458x269](https://gitee.com/xin_accio/pic-go-images/raw/master/20250820152740275.png)

- 方法1：在前端去掉
- 方法2：在后端去掉
-后端去掉这么干：
`TokenAuthenticationFilter` 中，可以看到这个

```java
IBaseUser<String> userDetails = redisTemplate.opsForValue().get(bearer);
```

调试的时候可以看一下这里get到的bearer内容

我的出现了一个 Bearer XXXXX:xxxxx...... （后面是token）

只要在这前面加上

```java
bearer = bearer.replace("Bearer ", "");
```

但是这样会出现问题，会出现类型转换失败的问题。

只要让相应的登录使用的VO继承一个接口

```java
IBaseUser<String>
```

这是一个Redis相关的接口，需要在底下好好实现一下

这东西又不行了，改了一下SpringSecurityConfig 在里面配置一下cors的东西就好了

是因为和上面那个新配置的

前端倒没什么难的，没有界面要求的情况下vibe coding完全可以搞定，就注意一下接口传来的参数对不对就好了

- [x] 主页文章显示日期有问题 ✅ 2025-08-21

- [x] 个人的作品页面要能够删除 ✅ 2025-08-21
- [x] 删除时也要更新作品数目 ✅ 2025-08-21
- [ ] 限制字数

[[构造器build]] 又忘了

**打不开怎么办**

![image.png|315x289](https://gitee.com/xin_accio/pic-go-images/raw/master/20250825100654287.png)

换端口：上次有用，这次没有用

我重启电脑试试,没用
![image.png|482x479](https://gitee.com/xin_accio/pic-go-images/raw/master/20250825103930196.png)
我发现我这个根本没打开,然后我就把这个都打开了,也不行

折腾了半天,把一个叫 `setUpProxy` 的文件删了重启就好了....AI干了

## 12 会员权限

role

'ADMIN'
'MEMBER'
'USER'

