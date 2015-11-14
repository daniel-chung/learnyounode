// 1.
//console.log("HELLO WORLD");

// 2.
/*var inputs = process.argv;
var result = 0;
for (var i=2; i<inputs.length; i++) {
  result += Number(inputs[i]);
}
console.log(result);
*/

// 3.
/*var fs = require('fs');
var file = process.argv[2];
var buf = fs.readFileSync(file);
var str = buf.toString().split('\n');
var numLines = str.length - 1;
console.log(numLines);
*/

// 4.
/*var fs = require('fs');
var file = process.argv[2];
var numLines = fs.readFile(file, 'utf8', function(err, fileContents){
  console.log(fileContents.split('\n').length - 1);
});
*/
/*
// 5.
var fs = require('fs');
var path = process.argv[2];
var ext = process.argv[3];
var re = new RegExp('\.'+ext+'$');

fs.readdir(path, function(err, files) {
  var results = files.filter(function(e){
    return re.test(e);
  });
  for (var i = 0; i < results.length; i++) {
    console.log(results[i]);
  }
});
*/

// 6.
/*var fs = require('fs');
var path = require('path');
var mymodule = require('./mymodule.js');

mymodule(process.argv[2], process.argv[3], function(err, list) {
  list.forEach(function(file) {
    console.log(file);
  });
});
*/

// 7.
/*var url = process.argv[2];
var http = require('http');
http.get(url, function(response) {
  response.setEncoding('utf8').on("data", function (data) {
    console.log(data);
  });
});
*/

// 8.
/*var url = process.argv[2];
var http = require('http');
var bl = require('bl')  

http.get(url, function(response) {
  response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err);
    console.log(data.length);
    console.log(data.toString());
  }));
});
*/

// 9.
/*var urls = [process.argv[2], process.argv[3], process.argv[4]];
var http = require('http');
var bl = require('bl');

function printData(id) {
  if (id >= 3)
    return false;
  http.get(urls[id], function(response) {
    response.pipe(bl(function(err, data) {
      if (err)
        return console.error(err);
      console.log(data.toString());
    }));
    response.on("end", function () {
      printData(id+1);
    });
  })
};

printData(0);
*/

// 10.
/*var port = process.argv[2];
var net = require('net');
function zeroPad(n) {
  return (n < 10 ? '0'+n.toString() : n.toString());
}
var server = net.createServer(function(socket) {
  var date = new Date();
  socket.write(
    date.getFullYear().toString() + '-' + 
    zeroPad(date.getMonth() + 1) + '-' +
    zeroPad(date.getDate()) + ' ' +
    zeroPad(date.getHours()) + ':' +
    zeroPad(date.getMinutes() + '\n')
  );
  socket.end();
});
server.listen(port);
*/

// 11.
/*var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var path = process.argv[3];
var server = http.createServer(function(request, response){
    var file = fs.createReadStream(path);
    file.pipe(response);
});
server.listen(port);
*/

/*
     var http = require('http')  
     var fs = require('fs')  
     var server = http.createServer(function (req, res) {  
       res.writeHead(200, { 'content-type': 'text/plain' })  
       fs.createReadStream(process.argv[3]).pipe(res)  
     })  
       
     server.listen(Number(process.argv[2]))  
*/

// 12
/*var http = require('http');
var fs = require('fs');
var map = require('through2-map');
var server = http.createServer(function (req, res) {
  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase();
  })).pipe(res);
});
server.listen(Number(process.argv[2])); 
*/
/*
     var http = require('http')  
     var map = require('through2-map')  
     var server = http.createServer(function (req, res) {  
       if (req.method != 'POST')  
         return res.end('send me a POST\n')  
       req.pipe(map(function (chunk) {  
         return chunk.toString().toUpperCase()  
       })).pipe(res)  
     })  
       
     server.listen(Number(process.argv[2]))  
   */


// 13
var http = require('http');
var url = require('url');
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  //if (req.method != 'GET')
  //  return res.end('End a Gest request\n');
  //res.end(url.parse(req.url, true));
  var info = url.parse(req.url, true);
  var date = new Date(info.query.iso);
  var path = info.pathname;
  var rVal = {};

  if (path === '/api/unixtime') {
    rVal.unixtime = Date.parse(info.query.iso);   
    res.end(JSON.stringify(rVal));
  }
  else if (path === '/api/parsetime') {
    rVal.hour = date.getHours();
    rVal.minute = date.getMinutes();
    rVal.second = date.getSeconds();
    res.end(JSON.stringify(rVal));
  }
});
server.listen(Number(process.argv[2]));

/*

     var http = require('http')  
     var url = require('url')  
     function parsetime (time) {  
       return {  
         hour: time.getHours(),  
         minute: time.getMinutes(),  
         second: time.getSeconds()  
       }  
     }  
     function unixtime (time) {  
       return { unixtime : time.getTime() }  
     }  
       
     var server = http.createServer(function (req, res) {  
       var parsedUrl = url.parse(req.url, true)  
       var time = new Date(parsedUrl.query.iso)  
       var result  
       
       if (/^\/api\/parsetime/.test(req.url))  
         result = parsetime(time)  
       else if (/^\/api\/unixtime/.test(req.url))  
         result = unixtime(time)  
       
       if (result) {  
         res.writeHead(200, { 'Content-Type': 'application/json' })  
         res.end(JSON.stringify(result))  
       } else {  
         res.writeHead(404)  
         res.end()  
       }  
     })  
     server.listen(Number(process.argv[2]))  
*/




// EOF
