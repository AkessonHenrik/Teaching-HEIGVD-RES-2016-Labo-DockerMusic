FROM node:argon
RUN mkdir -p /usr/src/auditor
WORKDIR /usr/src/auditor
COPY package.json /usr/src/auditor
RUN npm install
COPY . /usr/src/auditor
EXPOSE 8080
CMD ["npm", "start"]
##RUN npm install dgram
##RUN npm install node-uuid
RUN node Auditor.js
