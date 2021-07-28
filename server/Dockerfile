FROM node:12.22.1-buster-slim
#  创建工作目录
RUN rm -rf /app
RUN mkdir /app
# 指定工作目录
WORKDIR /app
# 将当前目录的代码拷贝到工作目录
COPY . /app
# 构建依赖

RUN yarn install
# 指定docker服务端口
EXPOSE 3001

CMD node app.js