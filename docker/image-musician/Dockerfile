FROM node:argon
RUN mkdir -p /usr/src/musician
WORKDIR /usr/src/musician
COPY package.json /usr/src/musician
RUN npm install
COPY . /usr/src/musician
EXPOSE 8080
CMD ["npm", "start"]
##RUN npm install dgram
##RUN npm install node-uuid
RUN node Musician.js piano
