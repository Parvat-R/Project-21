FROM node:24
WORKDIR /usr/home/backend

COPY . .

RUN npm i
RUN npm run build
EXPOSE 3000
RUN npm run start