FROM node:hydrogen

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/main.js"]
EXPOSE 3000
