Docker:
+ Cấu hình 3 container chạy backend: nodejs, database mysql, frontend nginx 
+ Build dockerfile trong mỗi thư mục ra thành image
+ docker run -d -p3306:3306 -v ./database/db:/var/lib/mysql --name mysql mysql:tmdt 
+ docker run -d -p80:80 --name frontend frontend:tmdt
+ docker run -d -p3000:3000 --name backend backend:tmdt

sudo docker network connect my-network backend
sudo docker network connect my-network frontend
sudo docker network connect my-network mysql

(Có thể phải chạy lại backend nếu cần)