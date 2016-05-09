FROM node:5.3.0
COPY ./ res
EXPOSE 9907
RUN npm install node-uuid

ENTRYPOINT ["node", "res/Musician.js"]
