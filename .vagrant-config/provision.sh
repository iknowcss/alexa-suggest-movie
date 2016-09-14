#!/bin/bash

echo Start provisioning...

echo Copy set_env_vars.sh file to etc/profile.d
sudo cp /vagrant/.vagrant-config/set_env_vars.sh /etc/profile.d/set_env_vars.sh

echo Update apt-get
sudo apt-get --yes update

echo Install build dependencies
sudo apt-get -y install autoconf bison build-essential git libssl-dev libyaml-dev libreadline6 libreadline6-dev zlib1g zlib1g-dev libcurl4-openssl-dev curl wget zip unzip dos2unix libpq-dev --force-yes

echo Set /vagrant as default directory
echo "cd /vagrant" >> /home/vagrant/.profile

echo Done provisioning.