# Note for development:

**In order to run the project, follow these steps:**
- Angular (v13.3.3) + Node.js (v16.14.2) + npm (v8.5.0) installed
- backend/.env file created (at this exact path)
- MongoDB server running, and its URI defined in .env
- `npm install` to install dependencies
- `npm start` : **automatically** runs `ng serve` and `node server.js` using concurrency

### Tip: 

.env should look like this:
```bash
MONGO_URI=mongodb://localhost:27017/collection_name //you created it 🫵
PORT=port //3000 or any other available port 🤷‍♂️
JWT_SECRET=secret_password //whatever? 
```

You can create it by running this command at the **root** of the project: (UNIX)

```bash
cat > backend/.env <<EOF
MONGO_URI=mongodb://localhost:27017/collection_name
PORT=3000
JWT_SECRET=your_secret_password
EOF
```
Windows version: (Powershell)

```powershell
@"
MONGO_URI=mongodb://localhost:27017/collection_name
PORT=3000
JWT_SECRET=your_secret_password
"@ | Set-Content -Path "backend\.env"
```

To have the necessary data to run the website to test it, you can execute the following command in 
your mongosh terminal to insert basic data in the database ( le mot de passe pour tout les utilisateurs est "admin" pour faciliter l'utilisation) :

```mongosh
db.users.insertMany([{firstName: "Jean", lastName: "Pierre", email: "jean.pierre@gmail.com",
  password: "$$2b$10$ZbL3GzXW/wjt5EkuWxG0Je22upCTL.k98w9KJ1N3UDP6.N2JsXS7m",  role: "student",
  registeredUEs: [ { code: "WE4A" } ] },
  {firstName: "Justine", lastName: "Prévaut", email: "justine.prevaut@gmail.com",
  password: "$2b$10$ZbL3GzXW/wjt5EkuWxG0Je22upCTL.k98w9KJ1N3UDP6.N2JsXS7m",  role: "student",
  registeredUEs: [ { code: "IT41" } ] },
  {firstName: "Henri", lastName: "Duval", email: "henri.duval@gmail.com",
  password: "$2b$10$ZbL3GzXW/wjt5EkuWxG0Je22upCTL.k98w9KJ1N3UDP6.N2JsXS7m",  role: "prof",
  registeredUEs: [ { code: "WE4A" }, { code: "IT41" } ] },
  {firstName: "Jean", lastName: "Arc", email: "jean.arc@gmail.com",
  password: "$2b$10$ZbL3GzXW/wjt5EkuWxG0Je22upCTL.k98w9KJ1N3UDP6.N2JsXS7m",  role: "admin",} ] );

db.ues.insertMany([{ code: "WE4A", name: "Développement web", description: "Initiation au développement pour site internet",
    updatedAt: ISODate("2025-03-02T15:46:05.000Z"), illustration: "assets/img/it41_gpt.png"}, 
    { code: "IT41", name: "Introduction IA", description: "Initiation à la création d'IA",
    updatedAt: ISODate("2025-03-02T08:26:17.000Z"), illustration: "assets/img/it44_gpt.png"}]);


```

Alternative, dans `mongosh`:
```
load("dossier_projet/seed.js")
```

L'utilisateur admin par défaut est 

email : «jean.arc@gmail.com» 

mdp : «admin».

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
