const db = require('../database');

module.exports = class Zadatak {
    constructor (opis, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, idGrupe, idVrste, idStatusa, idPrioriteta, idRadnogLista, idProjekta) {
        this.opis = opis;
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
        // todo fix sql injection vuln
        const sql = "INSERT INTO Zadatak (opis, planDatPoc, planDatKraj, planBudzet," +
                                            " planBrSati, idVrste, idStatusa, idPrioriteta, idProjekta) VALUES (" +
            `'${this.opis}', '${this.planDatPoc}', '${this.planDatKraj}', '${this.planBrSati}', '${this.idVrste}', '${this.idStatusa}', 
             '${this.idPrioriteta}', '${this.idProjekta}')
            RETURNING *`;

        try {
            let zadatak = await db.query(sql, []);
            return zadatak

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getZadatakInfo(idProjekta) {
        const sql = `SELECT * FROM Zadatak WHERE idProjekta = '${idProjekta}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}