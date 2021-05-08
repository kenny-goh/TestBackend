FROM node:16-alpine
WORKDIR /app
COPY . .
RUN echo "Installing dependencies"
RUN npm install
run echo "Running tests"
RUN npm test
CMD ["npm", "start"]