FROM alpine
RUN apk add --update ca-certificates && \
    rm -rf /var/cache/apk/* /tmp/*
ADD <%=serviceName%>-srv /<%=serviceName%>-srv
WORKDIR /
ENTRYPOINT [ "/<%=serviceName%>-srv" ]
