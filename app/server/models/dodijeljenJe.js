const db = require('../database');

module.exports = class dodijeljenJe {
    constructor (idZaposlenika, idZadatka) {
        this.idZaposlenika = idZaposlenika;
        this.idZadatka = idZadatka;
    }

    static async insert(idZadatka, idZaposlenika) {
        return await db.query(
            `INSERT INTO dodijeljenJe (idZaposlenika, idZadatka)
             VALUES ($1, $2) RETURNING *`,
            [idZaposlenika, idZadatka]
        );
    }

    static async getdodijeljenJeInfo(idZaposlenika, idZadatka) {
        return (await db.query(
            `SELECT * FROM Zadatak NATURAL JOIN Zaposlenik
             WHERE Zadatak.idZadatka = $1 AND Zaposlenik.idZaposlenika = $2`,
            [idZadatka, idZaposlenika]
        )).rows;
    }

    static async getdodijeljenJeZadatak(idZadatka) {
        return (await db.query(
            `SELECT idZaposlenika FROM dodijeljenJe WHERE idZadatka = $1`,
            [idZadatka]
        )).rows;
    }

    static async getdodijeljenJeKorisnik(idZaposlenika) {
        return (await db.query(
            `SELECT idZadatka FROM dodijeljenJe WHERE idZaposlenika = $1`,
            [idZaposlenika]
        )).rows;
    }

    static async getGetProjectTasksCountForUser(idZaposlenika, idProjekta) {
        return (await db.query(
            `SELECT COUNT(*) FROM dodijeljenJe NATURAL JOIN zadatak WHERE idProjekta = $1 AND idZaposlenika = $2`,
            [idProjekta, idZaposlenika]
        )).rows;
    }

    static async getGetFinishedProjectTasksCountForUser(idZaposlenika, idProjekta) {
        return (await db.query(
            `SELECT COUNT(*) FROM dodijeljenJe NATURAL JOIN zadatak NATURAL JOIN status WHERE idProjekta = $1 AND idZaposlenika = $2 AND nazivStatusa = 'Gotov'`,
            [idProjekta, idZaposlenika]
        )).rows;
    }
}