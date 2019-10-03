FROM alpine
RUN apk add --update ca-certificates && \
    rm -rf /var/cache/apk/* /tmp/*
ADD language_master_schedule-srv /language_master_schedule-srv
WORKDIR /
ENTRYPOINT [ "/language_master_schedule-srv" ]
