FROM node:20-alpine

# Directory for the app
WORKDIR /app

# copy the Rearly files to the container
COPY prisma ./prisma/
COPY package.json package-lock.json ./  

# Install dependencies
RUN npm install


COPY ./  ./



EXPOSE 3000

CMD [ "npm", "run", "dev" ]

