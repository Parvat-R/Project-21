FROM node:24-alpine

WORKDIR /usr/home/backend

COPY package*.json ./
RUN npm install
RUN npm cache clean --force

COPY . .

ARG DATABASE_URL
ARG FRONTEND_URL
ARG MAIL_HOST
ARG MAIL_USER
ARG MAIL_PASS
ENV DATABASE_URL=${DATABASE_URL}
ENV FRONTEND_URL=${FRONTEND_URL}
ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_USER=${MAIL_USER}
ENV MAIL_PASS=${MAIL_PASS}


RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"] 