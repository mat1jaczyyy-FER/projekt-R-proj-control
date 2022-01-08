const db = require('../database');

module.exports = class Zadatak {
    constructor (opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, brSati, idVrste, idStatusa, idPrioriteta, idProjekta) {
        this.opisZadatka = opisZadatka;
        this.planDatPoc = planDatPoc;
        this.planDatKraj = planDatKraj;
        this.planBudzet = planBudzet;
        this.budzet = budzet;
        this.datPoc = datPoc;
        this.datKraj = datKraj;
        this.planBrSati = planBrSati;
        this.brSati = brSati;
        this.idVrste = idVrste;
        this.idStatusa = idStatusa;
        this.idPrioriteta = idPrioriteta;
        this.idProjekta = idProjekta;
    }

    async apply() {
        console.log(this.idVrste)
        return await db.query(
            `INSERT INTO Zadatak (opisZadatka, planDatPoc, planDatKraj, planBudzet, planBrSati, idVrste, idStatusa, idPrioriteta, idProjekta)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [this.opisZadatka, this.planDatPoc, this.planDatKraj, this.planBudzet, this.planBrSati, this.idVrste, this.idStatusa, this.idPrioriteta, this.idProjekta]
        );
    }

    static async getZadatakInfo(idProjekta) {
        return (await db.query(
            `SELECT * FROM Zadatak WHERE idProjekta = $1`,
            [idProjekta]
        )).rows;
    }

    static async delete(idzadatka) {
        return await db.query(
            `DELETE FROM Zadatak WHERE idzadatka = $1 RETURNING *`,
            [idzadatka],
            `DELETE FROM DodijeljenJe WHERE idzadatka = $1 RETURNING *`,
            [idzadatka]

        );
    }
}