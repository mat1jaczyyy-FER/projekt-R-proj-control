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
        return await db.query(
            `INSERT INTO GrupaZadataka (nazivGrupe, opis, prioritet, planBudzet, budzet, idProjekta)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [this.nazivGrupe, this.opis, this.prioritet, this.planBudzet, this.budzet, this.idProjekta]
        );
    }

    static async getGrupaZadatakaInfo(idProjekta) {
        return (await db.query(
            `SELECT * FROM GrupaZadataka WHERE idProjekta = $1`,
            [idProjekta]
        )).rows;
    }
}