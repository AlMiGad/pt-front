FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm i concurrently

COPY . .

RUN npm run build

EXPOSE 3000 8000

CMD ["npm", "start"]