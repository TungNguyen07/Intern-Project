# Intern-Project
#### A project for my intern course in Long Xuyen city Cultural and Sports Center.
#### A news website about activites take place in this center.
## Requirment
* Nodejs
* MongoDB
* Git
## Common setup
Clone project and install dependencies.
```
git clone 'https://github.com/TungNguyen07/Intern-Project'
cd Intern-Project
```
Install dependencies client-side
```
cd client
npm install
```
Install server-side
```
cd server
npm install
```
## Run project
Run client-side
```
cd client
npm run build
```
```
npm run start
```
Run server-side
```
cd server
npm run start
```
Open [http://localhost:3000](http://localhost:3000) and take a look around
## Init user
Init user admin
```
cd server
npm migrate-up
```
User admin:
* username: admin
* password: 123456
