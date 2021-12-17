const db = require('../database');

module.exports = class PrioritetZadatka {
    constructor (nazivPrioriteta) {
        this.nazivPrioriteta = nazivPrioriteta;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO PrioritetZadatka (nazivPrioriteta) VALUES (" +
            `'${this.nazivPrioriteta}')
            RETURNING *`;

        try {
            let prioritet = await db.query(sql, []);
            return prioritet;

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async getPrioritetZadatkaInfo(nazivPrioriteta) {
        const sql = `SELECT * FROM PrioritetZadatka WHERE nazivPrioriteta = '${nazivPrioriteta}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}