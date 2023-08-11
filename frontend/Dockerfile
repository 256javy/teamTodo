# react dockerfile template:
# https://mherman.org/blog/dockerizing-a-react-app/
#

# pull official base image
FROM node:18

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

# install app dependencies
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]