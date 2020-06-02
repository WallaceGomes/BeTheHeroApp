const crypto = require('crypto'); //pacote do node default

module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
};
