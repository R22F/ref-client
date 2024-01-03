docker build -t ref/client:0.0.1 .

docker run -d -p 80:3000 ref/monolithic-server