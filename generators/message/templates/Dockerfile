FROM mhart/alpine-node:12

WORKDIR /app
COPY . .

# RUN apk add --no-cache make gcc g++ python
RUN yarn install --prod
EXPOSE 3030
CMD ["yarn", "run", "prod"]