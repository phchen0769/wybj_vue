FROM alpine:latest

LABEL MAINTAINER = "Fedorov"


# 替换apk使用的源
COPY repositories /etc/apk/repositories

# 设定容器时间
RUN echo "export TZ='CST-8'" > /etc/profile

# Install required packages and remove the apt packages cache when done.
RUN apk update && apk add --no-cache --update-cache libuv\
    nodejs \
	gcc \
	make \
	g++ \
	git \
	npm \
	python3 \
	openssh-client

WORKDIR /workspaces/wybj_vue

EXPOSE 8080

CMD ["npm", "config", "set", "registry", "https://registry.npm.taobao.org/"]