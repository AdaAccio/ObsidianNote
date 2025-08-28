# 1 常用命令

`cd ..` 轻松返回上一级

`apt install xxx` 下载常用

`sz 文件路径` 下载到主机中 这个是给secureCRT用的

## 1 用户

创建一个用户 就可以在这里面下载文件了！

![image.png](https://gitee.com/xin_accio/pic-go-images/raw/master/20250827180538609.png)

进镜像的目录 先执行 `. ./99` tabel 的命令
然后选 然后docker-compose up -d

## 1.1 配置镜像加速

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
