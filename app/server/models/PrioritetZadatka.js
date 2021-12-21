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

    async getPrioritetZadatkaInfo(nazivPrioriteta) {
        return (await db.query(
            `SELECT * FROM PrioritetZadatka WHERE nazivPrioriteta = $1`,
            [nazivPrioriteta]
        )).rows;
    }
}