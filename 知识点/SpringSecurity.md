#java #Spring 

[Spring中文文档](https://springdoc.cn/spring-security/)
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
public class DefaultSecurityConfig { @Bean @ConditionalOnMissingBean(UserDetailsService.class) InMemoryUserDetailsManager inMemoryUserDetailsManager() { String generatedPassword = // ...; return new InMemoryUserDetailsManager(User.withUsername("user") .password(generatedPassword).roles("ROLE_USER").build()); } @Bean @ConditionalOnMissingBean(AuthenticationEventPublisher.class) DefaultAuthenticationEventPublisher defaultAuthenticationEventPublisher(ApplicationEventPublisher delegate) { return new DefaultAuthenticationEventPublisher(delegate); } }
```