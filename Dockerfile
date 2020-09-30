FROM node:alpine
WORKDIR /usr/src/app

ADD ./package.* /usr/src/app/
RUN npm i

ADD ./ /usr/src/app/

CMD ["npm", "start"]

EXPOSE 9545/tcp
EXPOSE 9546/tcp
