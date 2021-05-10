FROM jtbaird/alpine-node-mongo:latest
WORKDIR /app
COPY . .
RUN echo "Installing dependencies"
RUN npm install
run echo "Running tests"
RUN npm test
CMD ["npm", "start"]