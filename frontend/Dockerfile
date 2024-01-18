# Base Image
FROM node:latest

# Set Working Directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Listen to port 3000 within the container
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
