FROM node:25

WORKDIR /Backend

COPY package*.json ./

RUN npm install

RUN npm list prisma
RUN npx prisma -v

COPY . .

RUN npx prisma generate

EXPOSE 8000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]