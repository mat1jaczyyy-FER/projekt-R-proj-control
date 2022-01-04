const db = require('../database');

module.exports = class Zadatak {
    constructor (opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, idGrupe, idVrste, idStatusa, idPrioriteta, idRadnogLista, idProjekta) {
        this.opisZadatka = opisZadatka;
        this.planDatPoc = planDatPoc;
        this.planDatKraj = planDatKraj;
        this.planBudzet = planBudzet;
        this.budzet = budzet;
        this.datPoc = datPoc;
        this.datKraj = datKraj;
        this.planBrSati = planBrSati;
        this.idGrupe = idGrupe;
        this.idVrste = idVrste;
        this.idStatusa = idStatusa;
        this.idPrioriteta = idPrioriteta;
        this.idRadnogLista = idRadnogLista;
        this.idProjekta = idProjekta;
    }

    async apply() {
        console.log(this.idVrste)
        return await db.query(
            `INSERT INTO Zadatak (opisZadatka, planDatPoc, planDatKraj, planBrSati, idVrste, idStatusa, idPrioriteta, idProjekta)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [this.opisZadatka, this.planDatPoc, this.planDatKraj, this.planBrSati, this.idVrste, this.idStatusa, this.idPrioriteta, this.idProjekta]
        );
    }

    static async getZadatakInfo(idProjekta) {
        return (await db.query(
            `SELECT * FROM Zadatak WHERE idProjekta = $1`,
            [idProjekta]
        )).rows;
    }
}