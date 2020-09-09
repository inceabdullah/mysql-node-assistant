const getColumns = require("./DBgetColumns");
const getColumnsNonSafe = require("./DBgetColumnsNonSafe");
const getVal = require("./DBgetVal");
const insert = require("./DBinsert");
const insertWithPK = require("./DBinsertWithPK");
const sendQuery = require("./DBsendQuery");
const thereIs = require("./DBthereIs");
const thereIsDouble = require("./DBthereIsDouble");
const update = require("./DBupdate");
const updateMultiple = require("./DBupdateMultiple");
const updateNonSafe = require("./DBupdateNonSafe");

module.exports.getColumns = getColumns;
module.exports.getColumnsNonSafe = getColumnsNonSafe;
module.exports.getVal = getVal;
module.exports.insert = insert;
module.exports.insertWithPK = insertWithPK;
module.exports.sendQuery = sendQuery;
module.exports.thereIs = thereIs;
module.exports.thereIsDouble = thereIsDouble;
module.exports.update = update;
module.exports.updateMultiple = updateMultiple;
module.exports.updateNonSafe = updateNonSafe;