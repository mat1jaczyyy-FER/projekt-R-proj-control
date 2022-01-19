const db = require('../database');

module.exports = class Uloga {
    constructor (nazivUloge) {
        this.nazivUloge = nazivUloge;
    }

    async apply() {
        return await db.query(
            `INSERT INTO Uloga (nazivUloge) VALUES (
             VALUES ($1) RETURNING *`,
            [this.nazivUloge]
        );
    }

    static async getUlogaName(idUloge) {
        return (await db.query(
            `SELECT * FROM Uloga WHERE idUloge = $1`,
            [idUloge]
        )).rows;
    }

}