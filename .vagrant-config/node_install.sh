#!/usr/bin/env bash

echo Install nodejs 5
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo rm /usr/bin/node # Remove the other 'node' symlink (Something about packet radio)
sudo ln -s `which nodejs` /usr/bin/node

echo Install npm 3
sudo npm install npm@3 -g
sudo npm config set registry https://registry.npmjs.com/
sudo npm config set strict-ssl false
