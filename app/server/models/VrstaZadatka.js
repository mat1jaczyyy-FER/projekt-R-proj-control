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

    static async getVrstaName(idVrste) {
        return (await db.query(
            `SELECT * FROM VrstaZadatka WHERE idvrste = $1`,
            [idVrste]
        )).rows;
    }

    static async getAllVrste() {
        return (await db.query(
            `SELECT * FROM VrstaZadatka`
        )).rows;
    }
}