const db = require('../database');

module.exports = class aktivacijskiKodovi {
    constructor (idKorisnika, aktivacijskiKod) {
        this.idKorisnika = idKorisnika;
        this.aktivacijskiKod = aktivacijskiKod;
    }

    async apply() {
        return await db.query(
            `INSERT INTO aktivacijskiKodovi (idKorisnika, aktivacijskiKod)
             VALUES ($1, $2) RETURNING *`,
            [this.idKorisnika, this.aktivacijskiKod]
        );
    }

    static async getKorisnikId(aktivacijskiKod) {
        return (await db.query(
            `SELECT idkorisnika FROM aktivacijskiKodovi
             WHERE aktivacijskikod = $1`,
            [aktivacijskiKod]
        )).rows;
    }

    static async deleteAktivacijskiKod(idKorisnika) {
        return (await db.query(
            `DELETE FROM aktivacijskiKodovi
             WHERE idKorisnika = $1`,
            [idKorisnika]
        )).rows;
    }
}