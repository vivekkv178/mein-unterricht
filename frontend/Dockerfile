# Use official Node.js image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NEXT_PUBLIC_MEIN_BE_BASE_URL=http://localhost:4000/backend

RUN npm run build

CMD ["npm", "start"]
