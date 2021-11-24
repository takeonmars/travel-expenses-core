FROM node:14.3.0-alpine3.11

WORKDIR /app

COPY package.json ./
RUN npm install


RUN apk add --no-cache bash bash-doc bash-completion

COPY . .

EXPOSE  3002
CMD [ "npm", "start" ]

