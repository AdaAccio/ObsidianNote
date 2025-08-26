
需要进行的操作如下

需要加一个表 这个表里面需要放每一个用户的id和角色

![image.png](https://gitee.com/xin_accio/pic-go-images/raw/master/20250826171344329.png)
再在继承了 `IBaseUser<String>` 的类中，加入

```java
@Schema(description = "角色列表")  
private List<String> roleSet;

public Collection<? extends GrantedAuthority> getAuthorities() {  
    List<SimpleGrantedAuthority> list = new ArrayList<>();  
    if (this.getRoleSet() != null) {  
        list.addAll(this.getRoleSet().stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r)).toList());  
    }  
    if (this.getPermissionSet() != null) {  
        list.addAll(this.getPermissionSet().stream().map(SimpleGrantedAuthority::new).toList());  
    }  
  
  
    return list;  
}
```

在进行登录操作时，加入

```java
List<SysRoleTab> userRoleTabs = sysRoleMapper.selectList(Wrappers.<SysRoleTab>lambdaQuery()  
        .eq(SysRoleTab::getUserId,vo.getUserId()));  
vo.setRoleSet(userRoleTabs.stream().map(SysRoleTab::getRoleType).toList());
```

最后，在 `SpringSecurityConfig` 中，加入以角色为条件的 `requestMatcher` 

```java
.requestMatchers(  
        "/work/api-work-info-save",  
        "/work/api-work-info-delete"  
).hasAnyRole("ADMIN","MEMBER")  
.requestMatchers(  
        "/user/api-user-info-delete",  
        "/api/admin-member-apply-permit",  
        "/api/admin-member-apply-page",  
        "/api/admin-member-apply-list",  
        "/api/admin-member-apply-get"  
).hasAnyRole("ADMIN")
```

