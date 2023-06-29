FROM node:16-alpine
WORKDIR /server

# Copy and download dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

# Copy the source files into the image
COPY . .

EXPOSE 3000
CMD ["npm","start"]
