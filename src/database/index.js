const {Pool} = require('pg');

const pool = new Pool({
    user: 'dgmpezensyynio',
    host: 'ec2-63-33-239-176.eu-west-1.compute.amazonaws.com',
    database: 'deqh32ufo24qd5',
    password: '796bd6737567d06b843ac6f378c53cac11682623abe64ac834ea3c972d915ee8',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: pool
}
