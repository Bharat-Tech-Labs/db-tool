const ssh2 = require('ssh2');

export default async (req, res) =>   {
    console.log('checkDiskSpace');
    res.statusCode = 200;
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });
  
    let key;
    let body;
    for (key in req.body) {
      body = JSON.parse(key);
    }
  
    let privateKey;
    if (body.sshPassword === '') {
      privateKey = require('fs').readFileSync(body.sshKey)
    }
    const conn = new ssh2.Client();
    
    conn.on('ready', function () {
      // console.log('Client :: ready');
  
      conn.exec('df -h', function (err, stream) {
        // console.log(stream);
        if (err) throw err;
        let resData = "";
        stream.on('close', function (code, signal) {
          res.end(resData);
          // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', function (data) {
          resData += data;
          // console.log('STDOUT: ' + data);
  
          // res.write(data);
        }).stderr.on('data', function (data) {
          console.log('STDERR: ' + data);
        });
      });
    }).on('error', function (err) {
      console.log("Connection not Established");
      res.end(err);
    }).connect({
      host: body.sshHost,
      port: body.sshPort,
      username: body.sshUser,
      privateKey: privateKey,
      password: body.sshPassword
    });
  
  }