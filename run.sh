docker build -t ref/client:0.0.2 .

docker run -d -p 82:3000 ref/client:0.0.2