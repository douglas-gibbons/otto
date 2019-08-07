# Build the app
FROM node:10.16.0-alpine as node
RUN apk add --no-cache git
WORKDIR /code
# NPM packages
COPY package*.json ./
RUN npm install
RUN mv node_modules clean_node_modules
COPY . .
RUN rm -Rf node_modules && mv clean_node_modules node_modules
# Build
RUN npm run build-prod

# Put it all together
FROM nginx:1.13.12-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /code/dist/otto /usr/share/nginx/html
