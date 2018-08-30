const pg = require('pg');
const url = 'postgres://pmkoktzpcfgnwl:af7b2bd3497be533212fa6ed2062d21f15dcefd1c3771a4de319583b5d6e3b9e@ec2-54-225-76-201.compute-1.amazonaws.com:5432/dbj8rv7j904i40';

const pool = new pg.Pool({
    connectionString: url,
    ssl: true
});

module.exports = pool;