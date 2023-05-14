#!/bin/bash

# setup.sh
# front-end

echo "===============Install Node=============="
sudo apt-get update -y && apt-get upgrade -y
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

echo "===============Install NginX============="
sudo apt-get install nginx
