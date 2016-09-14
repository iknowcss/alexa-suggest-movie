# -*- mode: ruby -*-
Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.synced_folder "./", "/vagrant"

  # default docker-compose.yml ports
  # config.vm.network "forwarded_port", guest: 8080, host: 8080, auto_correct: true
  config.vm.network "private_network", ip: "192.168.33.12"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
    # Allow symlinks
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate//vagrant", "1"]
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  # ssh configuration
  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  config.vm.provision :shell, :path => ".vagrant-config/provision.sh"
  config.vm.provision :shell, privileged: false, :path => ".vagrant-config/node_install.sh"
end
