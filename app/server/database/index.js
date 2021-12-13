const {Pool} = require('pg');

const pool = new Pool({
    user: 'xxlvjmifzfzzxf',
    host: 'ec2-52-49-23-139.eu-west-1.compute.amazonaws.com',
    database: 'dcnrusoio98o93',
    password: 'a9808052bd0227925056275506dfb9d24b1525d73e01d7014adca668b7ecd208',
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
