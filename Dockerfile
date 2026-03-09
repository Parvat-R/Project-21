FROM node:24-alpine
WORKDIR /usr/home/backend

COPY . .
RUN npm i

EXPOSE 3000
RUN npm run build
RUN npm run 