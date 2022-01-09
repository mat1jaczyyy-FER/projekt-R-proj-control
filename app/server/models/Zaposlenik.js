const db = require('../database');

module.exports = class Zaposlenik {
    constructor (korisnickoIme, lozinka, email, imeZaposlenika, prezimeZaposlenika, idUloge) {
        this.korisnickoIme = korisnickoIme;
        this.lozinka = lozinka;
        this.email = email;
        this.imeZaposlenika = imeZaposlenika;
        this.prezimeZaposlenika = prezimeZaposlenika;
        this.idUloge = idUloge
    }

    static async fetchByEmail(email) {
        const results = (await db.query(
            `SELECT * FROM Zaposlenik WHERE email = $1`,
            [email]
        )).rows;

        return results.length == 0
            ? new Zaposlenik()
            : new Zaposlenik(
                results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                results[0].imeZaposlenika, results[0].prezimeZaposlenika, results[0].idUloge
            );
    }
    static async fetchByUsername(username) {
        const results = (await db.query(
            `SELECT * FROM Zaposlenik WHERE korisnickoIme = $1`,
            [username]
        )).rows;

        return results.length == 0
            ? new Zaposlenik()
            : new Zaposlenik(
                results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                results[0].imeZaposlenika, results[0].prezimeZaposlenika, results[0].idUloge
            );
    }

    async apply() {
        return await db.query(
            `INSERT INTO Zaposlenik (korisnickoIme, lozinka, email, imeZaposlenika, prezimeZaposlenika, idUloge)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [this.korisnickoIme, this.lozinka, this.email, this.imeZaposlenika, this.prezimeZaposlenika, this.idUloge]
        );
    }

    static async getKorisnikInfo(email) {
        return (await db.query(
            `SELECT * FROM Zaposlenik WHERE email = $1`,
            [email]
        )).rows;
    }

    static async getKorisnikFromID(id) {
        return (await db.query(
            `SELECT * FROM Zaposlenik WHERE idZaposlenika = $1`,
            [id]
        )).rows;
    }

    static async activateKorisnik(idKorisnika) {
        return (await db.query(
            `UPDATE Zaposlenik SET aktiviran = TRUE WHERE idZaposlenika = $1`,
            [idKorisnika]
        )).rows;
    }
}