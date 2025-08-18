
## 0.1 branch

针对多人操作

切换分支，自己的资源管理器中也会变文件

### 0.1.1 merge

把分支合到主分支

## 0.2 命令行

1. `git init` 创建一个空仓库，里面只有.git文件夹
    
2. `git clone`+网址 克隆仓库
    
3. `git config` 两种
    
    `git config user.name` 用户名
    
    `git config user.email` 用户邮箱
    
    可以在 .git\config里面看到
    
4. `git status` 查看暂存区状态 会显示没有commit的文件（untracked）
    
5. `git add` +文件名 工作区→暂存区
    
    `git add *.xxx` 将所有格式为xxx的文件进行add
    
6. `git rm --cached` +文件名 暂存区->工作区
    
7. `git commit` 提交文件
    
    +`-m xxxx` m是消息，xxxx是输入的描述
    
8. `git log` 显示历史记录 相当于history
    
    +`--oneline` 只显示一行和七位版本号
    
9. 删除文件 正常删 删完add
    
10. `git restore xxx.xxx` 恢复删除的文件
    
    无法恢复？ `git reset hard` +版本号
    
    会丢失提交过程？`git revert` +版本号 恢复到想保留的提交之前的操作 会添加一个revert的log
    
11. `git remote -v` 获取 url
    
    在 IDEA 中 打开 `File->new->Project from version control` 新打开一个路径
    

### 0.2.1 分支

- 创建分支 需要提交至少一次文件之后 因为分支基于提交 可以在.git\refs\heads中查看
    
    `git branch xxxx` 新建一个分支
    
- 切换分支 `git checkout xxx`
    
    创建并切换 `git checkout -b xxxx`
    
- 删除 `git branch -d xxx`
    
- 合并
    
    先切换到main分支
    

`git merge` +分支名

出现冲突？![image-20250513174135100](file:///C:/Users/15141/AppData/Roaming/Typora/typora-user-images/image-20250513174135100.png?lastModify=1755503548)手动改一下 再保存 再add

### 0.2.2 标签

`git tag` +换行+tag

`-d` 删除

### 0.2.3 多账号问题

可以看这个help文档

[git-credential-manager/docs/multiple-users.md at main · git-ecosystem/git-credential-manager](https://github.com/git-ecosystem/git-credential-manager/blob/main/docs/multiple-users.md)

总之就是可以针对每个库用这个命令，就不用每次都选账号了

`git config --global credential.<URL>.username <USERNAME>`