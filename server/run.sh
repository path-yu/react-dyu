# 定义应用名称
app_name='react-dyu-api'
# 定义应用版本
app_version='1.0'
# 定义应用环境
profile_active='prod'
echo '----copy js----'
docker stop ${app_name}
echo '----stop container----'
docker rm ${app_name}
echo '----rm container----'
docker rmi ${app_name}:${app_version}
echo '----rm image----'
# 打包编译docker镜像
docker build -t ${app_name}:${app_version} .
echo '----build image----'
docker run -p 3001:3001 --name ${app_name} -d ${app_name}:${app_version}
echo '----start container----'