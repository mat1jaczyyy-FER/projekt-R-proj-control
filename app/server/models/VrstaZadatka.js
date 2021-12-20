const db = require('../database');

module.exports = class VrstaZadatka {
    constructor (nazivVrste) {
        this.nazivVrste = nazivVrste;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO VrstaZadatka (nazivVrste) VALUES (" +
            `'${this.nazivVrste}')
            RETURNING *`;

        try {
            let vrsta = await db.query(sql, []);
            return vrsta;

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async getVrstaInfo(nazivVrste) {
        const sql = `SELECT * FROM VrstaZadatka WHERE nazivVrste = '${nazivVrste}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}