#!/bin/sh

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

#To install the latest version, run:
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


#Create the docker group:
# Atribui o resultado do comando "getent group docker" à variável GRUPO_DOCKER
GRUPO_DOCKER=$(getent group docker)

# Verifica se a variável GRUPO_DOCKER está vazia (ou seja, o grupo não existe)
if [ -z "$GRUPO_DOCKER" ]; then
    echo "O grupo 'docker' não existe. Criando o grupo..."
    sudo groupadd docker
    if [ $? -eq 0 ]; then
        echo "Grupo 'docker' criado com sucesso!"
    else
        echo "Erro ao criar o grupo 'docker'."
        exit 1
    fi
else
    echo "O grupo 'docker' já existe."
fi

#Add your user to the docker group:
sudo usermod -aG docker $USER
