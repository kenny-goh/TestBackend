FROM node:16-alpine
WORKDIR /app
COPY . .
arg ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
RUN echo "Installing dependencies"
RUN npm install --only=prod || npm test
CMD ["npm", "start"]