const exec = require('child_process').exec;
exec('node try.js',function(err,stdout,stderr){
                console.log(stdout);
            });


            // eslint-disable-next-line @typescript-eslint/no-var-requires
            // const shell = require('shelljs');
            // shell.exec('node -v');