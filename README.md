# Intern-Project
#### A project for my intern course in Long Xuyen city Cultural and Sports Center.
#### A news website about activites take place in this center.
#### Using NextJs, ReactJs, Redux, Material-UI, NodeJs, MongoDB.
## Requirment
* Nodejs
* MongoDB
* Git
* Yarn
## Common setup
Clone project and install dependencies.
```
git clone 'https://github.com/TungNguyen07/Intern-Project'
cd Intern-Project
```
Install dependencies in client-side
```
cd client
yarn install
```
Install dependencies in server-side
```
cd server
yarn install
```
## Run project
Run client-side server
```
cd client
yarn build
```
```
yarn start
```
Run server-side server
```
cd server
yarn start
```
Open [http://localhost:3000](http://localhost:3000) and take a look around
## Init user
Init user admin
```
cd server
yarn migrate-up
```
User admin:
* username: admin
* password: 123456
