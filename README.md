Docker:

+ Build dockerfile trong /database ra thành image
+ Chạy câu lệnh docker run -d -p3306:3306 -v ./database/db:/var/lib/mysql --name mysql mysql:tmdt 
để lưu lại data thay đổi trong mysql container
+ chạy command docker compose -f docker-compose.yaml để chạy container nodejs và nginx
+ Để dừng container thì chạy Ctrl+C đối với màn hình cmd của nodejs và nginx, dùng docker stop mysql để dừng container mysql
