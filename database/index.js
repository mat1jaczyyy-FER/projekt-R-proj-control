const pg = require('pg');
require("dotenv").config();
const {Pool} = pg;

const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false
    }
}

// hack koji vraca date kako je u bazi, bez pretvaranja zona s tocnim vremenom.
// mozda promijeniti kasnije, ovisno jel radi...
// https://github.com/brianc/node-pg-types/issues/50#issuecomment-492144917
pg.types.setTypeParser(1082, s => s);

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        //console.log('executing query');
        //console.log(text);
        //console.log(params);
        return pool.query(text, params)
            .then(res => {
                //const duration = Date.now() - start;
                //console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            }).catch(err => {
                console.error(err);
                throw err;
            });

    },
    pool: pool
}
