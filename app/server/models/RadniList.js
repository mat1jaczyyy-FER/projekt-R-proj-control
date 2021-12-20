const db = require('../database');

module.exports = class RadniList {
    constructor (vrijemeRada, idZaposlenika) {
        this.vrijemeRada = vrijemeRada;
        this.idZaposlenika = idZaposlenika;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO RadniList (vrijemeRada, idZaposlenika) VALUES (" +
            `'${this.vrijemeRada}', '${this.idZaposlenika}')
            RETURNING *`;

        try {
            let list = await db.query(sql, []);
            return list

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getRadniListInfo(idZaposlenika) {
        const sql = `SELECT * FROM RadniList WHERE idZaposlenika = '${idZaposlenika}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}