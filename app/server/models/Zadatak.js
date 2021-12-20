const db = require('../database');

module.exports = class Zadatak {
    constructor (opis, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, idGrupe, idVrste, idStatusa, idPrioriteta, idRadnogLista) {
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
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO Zadatak (opis, planDatPoc, planDatKraj, planBudzet, budzet, datPoc," +
                                            "datKraj, planBrSati, idGrupe, idVrste, idStatusa, idPrioriteta, idRadnogLista) VALUES (" +
            `'${this.opis}', '${this.planDatPoc}', '${this.planDatKraj}', '${this.planBudzet}', '${this.budzet}', '${this.datPoc}',
             '${this.datKraj}', '${this.planBrSati}', '${this.idGrupe}', '${this.idVrste}', '${this.idStatusa}', 
             '${this.idPrioriteta}', '${this.idRadnogLista}')
            RETURNING *`;

        try {
            let zadatak = await db.query(sql, []);
            return zadatak

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getZadatakInfo(idGrupe) {
        const sql = `SELECT * FROM Zadatak WHERE idGrupe = '${idGrupe}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}