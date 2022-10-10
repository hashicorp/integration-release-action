FROM alpine:3.16
COPY notify-release.sh /notify-release.sh
ENTRYPOINT ["/notify-release.sh"]
