#java #Spring 

[Spring中文文档](https://springdoc.cn/spring-security/)
[SpringSecurity]([Spring Security](https://spring.io/projects/spring-security))
[一个说的还算明白的教程](https://blog.csdn.net/qq_17231297/article/details/129173532)

> [!NOTE] 简介
> 安全框架，方便使用，高度定制化

[[de-facto]] 

## 1 依赖

```xml
<dependencies>
	<!-- ... 其他依赖元素 ... -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-security</artifactId>
	</dependency>
</dependencies>
```
## 2 配置类

```java
@EnableWebSecurity
@Configuration
public class DefaultSecurityConfig {
    @Bean
    @ConditionalOnMissingBean(UserDetailsService.class)
    InMemoryUserDetailsManager inMemoryUserDetailsManager() {
        String generatedPassword = // ...;
        return new InMemoryUserDetailsManager(User.withUsername("user")
                .password(generatedPassword).roles("ROLE_USER").build());
    }

    @Bean
    @ConditionalOnMissingBean(AuthenticationEventPublisher.class)
    DefaultAuthenticationEventPublisher defaultAuthenticationEventPublisher(ApplicationEventPublisher delegate) {
        return new DefaultAuthenticationEventPublisher(delegate);
    }
}
```

`@EnableWebSecurity` 注解：启用web安全性

这个更像REST API安全规则的的写法
```java
@Configuration  
@EnableWebSecurity  
public class SpringSecurityConfig {  
    @Resource  
    private TokenAuthenticationFilter tokenAuthenticationFilter;  
  
    @Bean  
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {  
        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))  
                .csrf(AbstractHttpConfigurer::disable)  
                .httpBasic(Customizer.withDefaults())  
                .formLogin(AbstractHttpConfigurer::disable)  
                .logout(AbstractHttpConfigurer::disable)  
                .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  
                .authorizeHttpRequests((authorizeRequests) ->  
                        authorizeRequests  
                                .requestMatchers(  
                                        "/auth/api-user-account-get",  
                                        "/auth/api-user-account-save",  
                                        "/work/api-work-info-get",  
                                        "/work/api-work-info-user",  
                                        "/work/api-work-info-search",  
                                        "/v3/api-docs"  
                                ).permitAll()  
                                .anyRequest().authenticated()  
                )  
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  
        return http.build();  
    }  
  
}
```

## 3 日志

```
$ ./mvnw spring-boot:run
...
INFO 23689 --- [  restartedMain] .s.s.UserDetailsServiceAutoConfiguration :

Using generated security password: 8e557245-73e2-4286-969a-ff57fe326336

...
```

## 4 原理

SpringSecurity的原理其实就是一个[[过滤器链]]，内部包含了提供各种功能的过滤器。


## 5 角色

[[Role]]