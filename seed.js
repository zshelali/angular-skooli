// seed.js

db.users.insertMany([
  {
    firstName: "Jean", lastName: "Pierre", email: "jean.pierre@gmail.com",
    password: "$2a$12$lSrsXVO3JZ5g9g03ySJuqbuwyUg2vgtSMLdJWY2WV8Cjsf0NKdvuqa",
    role: "student",
    registeredUEs: [{ code: "WE4A" }]
  },
  {
    firstName: "Justine", lastName: "Prévaut", email: "justine.prevaut@gmail.com",
    password: "$2a$12$lSrsXVO3JZ5g9g03ySJuqbuwyUg2vgtSMLdJWY2WV8Cjsf0NKdvuqa",
    role: "student",
    registeredUEs: [{ code: "IT41" }]
  },
  {
    firstName: "Henri", lastName: "Duval", email: "henri.duval@gmail.com",
    password: "$2a$12$lSrsXVO3JZ5g9g03ySJuqbuwyUg2vgtSMLdJWY2WV8Cjsf0NKdvuqa",
    role: "prof",
    registeredUEs: [{ code: "WE4A" }, { code: "IT41" }]
  },
  {
    firstName: "Jean", lastName: "Arc", email: "jean.arc@gmail.com",
    password: "$2a$12$lSrsXVO3JZ5g9g03ySJuqbuwyUg2vgtSMLdJWY2WV8Cjsf0NKdvuqa",
    role: "admin"
  }
]);

db.ues.insertMany([
  {
    code: "WE4A",
    name: "Développement web",
    description: "Initiation au développement pour site internet",
    updatedAt: new Date("2025-03-02T15:46:05.000Z"),
    illustration: "assets/img/it41_gpt.png"
  },
  {
    code: "IT41",
    name: "Introduction IA",
    description: "Initiation à la création d'IA",
    updatedAt: new Date("2025-03-02T08:26:17.000Z"),
    illustration: "assets/img/it44_gpt.png"
  }
]);