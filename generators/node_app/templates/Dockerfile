FROM mhart/alpine-node:12

WORKDIR /app
COPY . .

# RUN apk add --no-cache make gcc g++ python
RUN npm install --prod
EXPOSE 50051
CMD ["npm", "start"]