#  SoftEng22-22

This is the Software Engineering class project for team 22 for 2022-2023.

## Recommended IDE Setup

[Intellij](https://www.jetbrains.com/idea/) or [VSCode](https://code.visualstudio.com/)  + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## Project Setup

Node.js, MongoDB and Postman need to be installed.

For the data dump backup/restore, [MongoDB Command Line Database Tools need to be installed](https://www.mongodb.com/try/download/database-tools), the downloaded contents need to be added to the MongoDB installation path, and the bin folder from there needs to be added to the system's PATH variable.

The above is also required for testing, as the tests automatically restore the dummy data before and after each test run.

For the CLI and the database backup/restore commands to be able to run, the system's PowerShell's execution policy may need to be changed. This can be done by running the following command as administrator in PowerShell

```sh
Set-ExecutionPolicy RemoteSigned
```
After all the above is installed, type the following command while on the project's directory

```sh
npm install
```
For the CLI to be installed so it can be used through PowerShell, while on the 'cli' directory run

```sh
npm install -g
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Load the frontend

```sh
npm run serve
```

### CLI

```sh
npm install -g
```
This command is recommended to be run while on the CLI folder.

Executing 

```sh
se2222
```

returns all the available commands and how they can be used.

### Testing

```sh
npm test
```
while on the project's root directory to execute the API's functional tests. 

```sh
npm test
```
while on the 'cli' directory to execute the CLI's functional/unit tests.

### Dummy Data

The dummy data is included in the 'data' directory, as .json files, as well as in the 'data/survey' directory, in the format supported by the mongodump/mongorestore commands.

To export the dummy data from the server as .json files, run the following command for each collection

```sh
mongoexport --db <database> --collection <collection> --type json --out <output path> <link to connect to mongodb database>
```

To import the dummy data to the server from .json files, run the following command for each collection

```sh
mongoimport --db <database> --collection <collection> <link to connect to mongodb database> <input path>
```
To export the dummy data from the server as a whole, run the following command

```sh
mongodump --db <database> --out <output path> <link to connect to mongodb database>
```
To import the dummy data from the server as a whole, run the following command (including --drop will clear the database before importing, restoring to the exact export from before)

```sh
mongorestore --db <database> --drop <link to connect to mongodb database> <input path>
```
