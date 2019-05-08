# Simple Movie Api

Simple Movie Api is a simple app based on http://www.omdbapi.com/.

### instalation
1. Git clone repository
2. Install depedencies
```sh
npm install
```
3. Turn on mysql on your local host or any remote server that you want to use
4. Create file .env based on .env-example file and save it next to it.
5. Go to folder config and run:
```sh
node createDatabase.js
```
or just create it manually - for example via PHPmyadmin
6. Go back to root folder and run:
```sh
node app
```
7. Server should ruun by default on port 3000.

### Tests
You can run tests:
```sh
npm test
```
License
----

MIT