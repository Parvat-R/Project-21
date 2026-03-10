FROM node:24-alpine

WORKDIR /usr/home/backend

COPY package*.json ./
RUN npm install
RUN npm cache clean --force

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"] 