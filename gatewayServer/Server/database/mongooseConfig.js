const mongoose = require("mongoose");
const config = require("config-lite")(__dirname);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbPath);

module.exports = {mongoose};
