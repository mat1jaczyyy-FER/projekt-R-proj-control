const db = require('../database');

module.exports = class PrioritetZadatka {
    constructor (nazivPrioriteta) {
        this.nazivPrioriteta = nazivPrioriteta;
    }

    async apply() {
        return await db.query(
            `INSERT INTO PrioritetZadatka (nazivPrioriteta)
             VALUES ($1) RETURNING *`,
            [this.nazivPrioriteta]
        );
    }

    static async getPrioritetZadatkaName(idprioriteta) {
        return (await db.query(
            `SELECT * FROM PrioritetZadatka WHERE idPrioriteta = $1`,
            [idprioriteta]
        )).rows;
    }

    static async getAllPrioritetiZadataka() {
        return (await db.query(
            `SELECT * FROM PrioritetZadatka`
        )).rows;
    }
}