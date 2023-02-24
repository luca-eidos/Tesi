#! /bin/bash

# enter the project directory and initialize it
# package.json will be created automatically
yarn init 

# initialize the client
yarn create react-app client
# test the creation of the client
cd client && yarn start
# check on the browser window that will be opened

# return to parent directory and create some useful folders
# c will contain the .c and .h files including the STB library
# bin will contain the WASM artifacts
# requests will contain the endpoints request callbacks
cd ..
mkdir c bin requests

# let us create the server root file, the "mjs" extension stands for JS module
touch index.mjs
# open the folder with Visual Studio Code
code .
# insert some boilerplate code for our express application
# <code>
# before tesing it, we need to compile a build for the client, which will be served at port 5000
cd client
yarn build
cd ..
node server.mjs
# <image>


