# 看板说明

1. Docker运行方式：

​	前端：从、https://hub.docker.com/repository/docker/doudouchen/nju_web_kanban/general拉取镜像，创建container，将端口3000映射为主机的3000。

​	后端：从https://hub.docker.com/repository/docker/doudouchen/project-backend/general拉取镜像，创建container，将端口5000映射为主机的5000。

​	访问http://localhost:3000即可。

2. 额外功能：
   - 三种任务状态：已完成，进行中，待办，并且添加选项框可以选择任务的状态。
   - 评论时间/任务创造时间：实时记录了评论/任务的创建时间。
3. 技术栈：
   - 数据库：后端使用Mongoose+MongoDB进行数据存储，通过MongoDB云服务器存储登录数据。
