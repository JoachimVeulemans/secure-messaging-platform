# 1 - Define base image for building the application
FROM node:latest as build-stage

# 2 - Set working directory
WORKDIR /app

# 3 - Copy package.json & package-lock.json
COPY package*.json /app/

# 4 - Install dependencies
RUN npm install

# 5 - Expose port 80
EXPOSE 80

# 6 Copy code to container
COPY . /app

# 7 - Define building configuration
ARG configuration=prod

# 8 - Perform build
RUN npm run build -- --${configuration} --output-path=./dist/out

# 9 - Define new base image for production
FROM nginx:latest

# 10 - Copy build application to container
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# 11 Copy the server configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
