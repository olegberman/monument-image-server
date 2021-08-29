# Setting up the image-server

## Install py deps
We're using https://github.com/nadermx/backgroundremover to remove backgrounds

`sudo apt install ffmpeg python3.6-dev`

`apt install python3-pip`

`pip3 install --upgrade pip`

`pip3 install backgroundremover`

## Install node.js
`curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -`

`sudo apt install nodejs`

`npm install pm2 -g`

## Create project folder
`cd /var && mkdir app`

## Generate key

`ssh-keygen`