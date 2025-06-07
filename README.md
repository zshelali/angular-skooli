# Note for development:

**In order to run the project, follow these steps:**
- Angular (v13.3.3) + Node.js (v16.14.2) + npm (v8.5.0) installed
- backend/.env file created
- MongoDB server running, and its URI defined in .env
- `npm install` to install dependencies
- `npm start` : **automatically** runs `ng serve` and `node server.js` using concurrency

### Tip: 

.env should look like this:
```
MONGO_URI=mongodb://localhost:27017/collection_name //you created it 🫵
PORT=port //3000 or any other available port 🤷‍♂️
JWT_SECRET=secret_password //whatever? 
```

$-Ali$
---- 

# AngularSkooli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
