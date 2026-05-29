FROM node:25
WORKDIR /Backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]