const db = require('../database');

module.exports = class VrstaZadatka {
    constructor (nazivVrste) {
        this.nazivVrste = nazivVrste;
    }

    async apply() {
        return await db.query(
            `INSERT INTO VrstaZadatka (nazivVrste) VALUES (
             VALUES ($1) RETURNING *`,
            [this.nazivVrste]
        );
    }

    async getVrstaInfo(nazivVrste) {
        return (await db.query(
            `SELECT * FROM VrstaZadatka WHERE nazivVrste = $1`,
            [nazivVrste]
        )).rows;
    }
}