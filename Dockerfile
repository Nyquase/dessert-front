FROM node:10-alpine

WORKDIR /app

# See .dockerignore
COPY . /app

RUN npm i --only=prod

RUN npm run build

CMD ["npm", "run", "--", "start", "-H", "0.0.0.0", "-p", "80"]