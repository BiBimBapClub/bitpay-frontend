#!/bin/bash

# setup.sh
# front-end
#install git, nginx, node, yarn, certbot
echo "=============================================="
echo "Essential Packages Installing"
echo "=============================================="
#sudo apt install -y  git
sudo apt install -y  nginx 
sudo curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install -y npm
node -v
npm -v 
sudo npm install -g yarn
yarn -v
sudo apt install -y certbot

echo "=============================================="
echo "git Pulling"
echo "=============================================="
# git clone repository
cd bitpay-frontend
git reset --hard
git fetch
git pull
# nginx config 파일 배치

echo "=============================================="
echo "nginx confing Setting for ssl"
echo "=============================================="

cd /etc/nginx/sites-enabled
sudo rm -rf default

sudo cp /home/ubuntu/bitpay-frontend/.config/front/default .

echo "=============================================="
echo "ssl Certifications"
echo "=============================================="

#certbot을 통해 ssl 적용
sudo apt-get install -y snapd
sudo snap install  core; sudo snap refresh core
sudo apt-get remove -y certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

echo "=============================================="
echo "Building Web Projects"
echo "=============================================="

cd /home/ubuntu/bitpay-frontend
npm install
npm build

echo "=============================================="
echo "ssl Deploy"
echo "=============================================="

sudo certbot --nginx
sudo systemctl restart nginx
