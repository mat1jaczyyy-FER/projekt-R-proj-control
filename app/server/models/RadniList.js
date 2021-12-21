const db = require('../database');

module.exports = class RadniList {
    constructor (vrijemeRada, idZaposlenika) {
        this.vrijemeRada = vrijemeRada;
        this.idZaposlenika = idZaposlenika;
    }

    async apply() {
        return await db.query(
            `INSERT INTO RadniList (vrijemeRada, idZaposlenika) VALUES (
             VALUES ($1, $2) RETURNING *`,
            [this.vrijemeRada, this.idZaposlenika]
        );
    }

    static async getRadniListInfo(idZaposlenika) {
        return (await db.query(
            `SELECT * FROM RadniList WHERE idZaposlenika = $1`,
            [idZaposlenika]
        )).rows;
    }
}