FROM node:20.14-alpine
WORKDIR /app
ADD package*.json package.json
RUN npm install
ADD . .
CMD ["nodejs", "index.js"]