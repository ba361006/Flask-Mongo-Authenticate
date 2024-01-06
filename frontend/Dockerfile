# Step 1: Build the React application
FROM node:latest as build

RUN echo "WORKDIR /frontend"
WORKDIR /frontend

RUN echo "COPY package.json ."
COPY package.json .

RUN echo "RUN npm install"
RUN npm install

RUN echo "COPY . ."
COPY . .

RUN echo "RUN npm run build"
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

RUN echo "COPY --from=build /frontend/build /usr/share/nginx/html"
COPY --from=build /frontend/build /usr/share/nginx/html

RUN echo "EXPOSE 3000"
EXPOSE 3000

RUN echo "CMD nginx -g 'daemon off;'"
CMD ["nginx", "-g", "daemon off;"]
