const pg = require('pg');
require("dotenv").config();
const {Pool} = pg;



const devConfig = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.
PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`


// hack koji vraca date kako je u bazi, bez pretvaranja zona s tocnim vremenom.
// mozda promijeniti kasnije, ovisno jel radi...
// https://github.com/brianc/node-pg-types/issues/50#issuecomment-492144917
pg.types.setTypeParser(1082, s => s);

const proConfig = process.env.DATABASE_URL2


const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

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
