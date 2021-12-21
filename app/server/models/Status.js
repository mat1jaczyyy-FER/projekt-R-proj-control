const db = require('../database');

module.exports = class Status {
    constructor (nazivStatusa) {
        this.nazivStatusa = nazivStatusa;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO Status (nazivStatusa) VALUES (" +
            `'${this.nazivStatusa}')
            RETURNING *`;

        try {
            let status = await db.query(sql, []);
            return status;

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getStatusName(idStatusa) {
        const sql = `SELECT nazivStatusa FROM Status WHERE idStatusa = '${idStatusa}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}