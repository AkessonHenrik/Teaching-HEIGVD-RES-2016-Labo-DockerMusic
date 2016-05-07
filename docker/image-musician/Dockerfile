FROM node:argon
RUN mkdir -p /musician
WORKDIR /musician
COPY package.json /musician
RUN npm install
COPY . /musician
EXPOSE 9907
ENTRYPOINT ["./musician"]
CMD ["npm", "start"]
##RUN npm install dgram
##RUN npm install node-uuidd
CMD ["node", "Musician.js", "arg1"]
