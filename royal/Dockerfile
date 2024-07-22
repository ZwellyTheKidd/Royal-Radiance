# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Disable strict SSL for npm
RUN npm config set strict-ssl false

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use NGINX to serve the Angular app
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=0 /usr/src/app/dist/royal /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
