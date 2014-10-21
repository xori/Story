var fs = require('fs'),
    rjson = require('relaxed-json');

exports.parse = function(file) {
  return rjson.parse(fs.readFileSync(file).toString());
}

exports.serialize = function(obj, toFile) {
  fs.writeFileSync(toFile, JSON.stringify(obj,null,2));
}
