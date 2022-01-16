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


    /*kaj radi ovo getZadatakInfo?*/
    /*radi ovo /allprojecttasks/:idProjekta */

    static async getZadatakInfo(idProjekta) {
        return (await db.query(
            `SELECT * FROM Zadatak WHERE idProjekta = $1`,
            [idProjekta]
        )).rows;
    }

    static async delete(idzadatka) {
        return await db.query(
            `DELETE FROM Zadatak WHERE idzadatka = $1 RETURNING *`,
            [idzadatka]
        );
    }

    static async update(opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, brSati, idVrste, idStatusa, idPrioriteta, idProjekta, idzadatka) {
        return await db.query(
            `UPDATE zadatak SET opisZadatka = $1, planDatPoc = $2, planDatKraj = $3,
             planBudzet = $4, budzet = $5, datPoc = $6, datKraj = $7, planBrSati = $8, brSati = $9, idVrste = $10, idStatusa = $11, idPrioriteta = $12, idProjekta = $13
             WHERE idzadatka = $14 RETURNING *`,
            [opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, brSati, idVrste, idStatusa, idPrioriteta, idProjekta, idzadatka]
        );
    }

    static async edit(idzadatka, idstatusa, brsati) {
        return await db.query(
            `UPDATE zadatak SET idstatusa = $1, brsati = $2 WHERE idzadatka = $3 RETURNING *`,
            [idstatusa, brsati, idzadatka]
        );
    }

    static async getZadatak(idzadatka) {
        return (await db.query(
            `SELECT * FROM Zadatak WHERE idzadatka = $1`,
            [idzadatka]
        )).rows;
    }

    static async startWorking(idzadatka) {
        return await db.query(
            `UPDATE zadatak SET idstatusa = 2, datpoc = $2 WHERE idzadatka = $1 RETURNING *`,
            [idzadatka, new Date()]
        );
    }
}