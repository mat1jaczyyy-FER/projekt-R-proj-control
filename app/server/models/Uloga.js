const db = require('../database');

module.exports = class Uloga {
    constructor (nazivUloge) {
        this.nazivUloge = nazivUloge;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO Uloga (nazivUloge) VALUES (" +
            `'${this.nazivUloge}')
            RETURNING *`;

        try {
            let uloga = await db.query(sql, []);
            return uloga;

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async getUlogaInfo(nazivUloge) {
        const sql = `SELECT * FROM Uloga WHERE nazivUloge = '${nazivUloge}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}