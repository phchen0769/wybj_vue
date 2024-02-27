FROM alpine:latest

LABEL MAINTAINER = "Fedorov"


# 替换apk使用的源
COPY repositories /etc/apk/repositories

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

WORKDIR /workspaces/yuejuan_vue

EXPOSE 9527

CMD ["npm", "config", "set", "registry", "https://registry.npmmirror.com"]