#!/bin/sh
#Check Next
sudo lsof -i :3000 > /dev/null 2>&1
if [ $? -eq 0 ]; then
	echo "NEXT em Execução"
else
	caminho="/root/imersao-home-broker/nestjs-api"
	cd "$caminho"
	echo "NEXT iniciando ..."
	nest start  > /dev/null 2>&1
	echo "NEXT em Execuação"
fi
