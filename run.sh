docker build -t ref/client:0.0.3 .

docker run -d -p 82:3000 ref/client:0.0.3