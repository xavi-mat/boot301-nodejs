const numeros = require("./numeros.js");
const Lp = require('logplease');
const lp = Lp.create('utils');

const dimeSiEsPar = (num) => {
    numeros.esPar(num) ?
        lp.info(`El número ${num} es par`) :
        lp.error(`El número ${num} no es par`);
};

[2, 3, 101, 201, 202, 100].forEach(num=>dimeSiEsPar(num));