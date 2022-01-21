const db = require('.')
const fs = require('fs');

(async () => {
    console.log("Initializing database...");

    let query = fs.readFileSync('./database/db-create.sql', 'utf8');

    if (process.argv.at(-1) === 'seed') {
        query += fs.readFileSync('./database/db-seed.sql', 'utf8');
    }

    query += fs.readFileSync('./database/db-finalize.sql', 'utf8');

    await db.pool.query(query);

    console.log("Done!");
})();
