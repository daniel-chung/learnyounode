var fs = require('fs');
var path = require('path');

module.exports = function(dirName, extName, callBack) {
  fs.readdir(dirName, function(err, list) {
    if (err)
      return callBack(err);
    list = list.filter(function(file) {
      return path.extname(file) === '.' + extName;
    });
    callBack(null, list);
  });
};


/*module.exports = function (dirName, extName, callBack) {
  var list = [];
  fs.readdir(dirName, function(err, list) {
    list.forEach(function(file) {
      if (path.extname(file) === '.' + extName)
        list.push(file);
    });
  });
  foo(function (err, list) {  
    if (err)  
      return callback(err);  
    callback(null, list);  
  })
}; 
*/

/*
function readdir(dirName, extName, callBack) {
  foo(function (err, data) {
    if (err)
      return callBack(err);
    callBack(null, data);
  });
  
  filter data here  

//callBack(dirName, extname);
};
*/

