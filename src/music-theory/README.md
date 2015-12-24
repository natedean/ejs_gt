## This is a test project for new server setup.

### First off, install global dependencies (please forgive if I miss any)

`$ npm i -g nodemon gulp jspm replace`

### To run dev environment:

#### Start app.js
`$ npm start` (You better have mongod running or you'll be in a world of pain)

#### Front End: Start watchers and serve static development files
`$ gulp serve`

### To build
`$ make build` and check out http://localhost:3000 where your dist folder is getting served (the npm start command ran this)

#### It is important to note that backend-only development really only needs `$ npm start`
