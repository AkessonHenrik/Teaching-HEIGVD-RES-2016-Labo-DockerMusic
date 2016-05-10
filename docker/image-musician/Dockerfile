FROM node:5.3.0
MAINTAINER	Henrik Akesson
COPY ./ res
RUN npm install node-uuid
ENTRYPOINT ["node", "res/Musician.js"]
