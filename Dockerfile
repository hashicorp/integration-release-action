FROM alpine:3.16
RUN apk update && apk add bash && apk add curl
COPY notify-release.sh /notify-release.sh
ENTRYPOINT ["/notify-release.sh"]
