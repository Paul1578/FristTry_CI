FROM node:current-alpine3.20
# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install -g @nestjs/cli
RUN npm install 

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD ["npm", "run", "start:dev"]