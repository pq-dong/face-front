FROM danjellz/http-server
COPY ./dist  .
EXPOSE  10012
CMD http-server  -p 10012
