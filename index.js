const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./db/connection');
const { init } = require("express/lib/application");

db.connect(function (err) {
    if(err){
        throw err
    }
    init()
})