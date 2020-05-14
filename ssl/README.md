1. openssl genrsa -out private.pem 1024
2. MSYS_NO_PATHCONV=1 openssl req -new -key private.pem -out csr.pem -subj "/C=CN/ST=shanghai/L=shanghai/O=lilith/OU=av/CN=qpjoy"
3. openssl x509 -req -days 365 -sha1 -extensions v3_ca -signkey \
   private.pem -in csr.pem -out ca.cer

4. express HttpsService
5. cd HttpsService && yarn
6. DEBUG=httpsservice:\* npm start
