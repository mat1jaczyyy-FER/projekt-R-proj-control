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

    static async getUlogaName(idUloge) {
        const sql = `SELECT nazivUloge FROM Uloga WHERE idUloge = '${idUloge}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}