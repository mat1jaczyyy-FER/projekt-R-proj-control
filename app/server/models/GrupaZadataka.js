const db = require('../database');

module.exports = class GrupaZadataka {
    constructor (nazivGrupe, opis, prioritet, planBudzet, budzet, idProjekta) {
        this.nazivGrupe = nazivGrupe;
        this.opis = opis;
        this.prioritet = prioritet;
        this.planBudzet = planBudzet;
        this.budzet = budzet;
        this.idProjekta = idProjekta;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO GrupaZadataka (nazivGrupe, opis, prioritet, planBudzet, budzet, idProjekta) VALUES (" +
            `'${this.nazivGrupe}', '${this.opis}', '${this.prioritet}', '${this.planBudzet}', '${this.budzet}', '${this.idProjekta}')
            RETURNING *`;

        try {
            let grupa = await db.query(sql, []);
            return grupa

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getGrupaZadatakaInfo(idProjekta) {
        const sql = `SELECT * FROM GrupaZadataka WHERE idProjekta = '${idProjekta}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}