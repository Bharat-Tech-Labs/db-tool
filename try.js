import {Pool} from 'pg';
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'psqldb',
  password: 'qwedsa',
  port: 5432,
})
console.log(pool)
// // client.connect()
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})