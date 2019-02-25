# library_bk

## Run following commands to genetare self sign certificate for creating https server
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt


