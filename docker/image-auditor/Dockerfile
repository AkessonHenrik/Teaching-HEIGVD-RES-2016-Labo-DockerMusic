FROM centos:centos6
RUN yum install -y epel-release
RUN yum install -y nodejs npm
RUN mkdir -p auditor
COPY package.json /auditor
WORKDIR /auditor
RUN npm install
COPY . /auditor
EXPOSE 2205
RUN ls
#RUN node Auditor.js
CMD ["node", "Auditor.js"]
##RUN npm install dgram
##RUN npm install node-uuid
#RUN node Auditor.js
