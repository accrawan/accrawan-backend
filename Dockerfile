FROM node:10
MAINTAINER Barnabas Nomo <barnabasnomo@gmail.com>

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production

COPY . .
EXPOSE 8080
CMD ["node", "bin/www"]