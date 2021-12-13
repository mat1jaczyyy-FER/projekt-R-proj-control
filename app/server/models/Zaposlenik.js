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
        // todo fix sql injection vuln
        const sql = `SELECT * FROM Zaposlenik WHERE email = '${email}'`;
        try {
            const results = (await db.query(sql, [])).rows;
            let newUser = null;
            if (results.length > 0) {
                newUser = new Zaposlenik(
                    results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                    results[0].imeZaposlenika, results[0].prezimeZaposlenika, results[0].idUloge
                );
            }
            return newUser;

        } catch (err) {
            return null;
        }
    }
    static async fetchByUsername(username) {
        // todo fix sql injection vuln
        const sql = `SELECT * FROM Zaposlenik WHERE korisnickoIme = '${username}'`;
        try {
            const results = (await db.query(sql, [])).rows;
            let newUser = null;
            if (results.length > 0) {
                newUser = new Zaposlenik(
                    results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                    results[0].imeZaposlenika, results[0].prezimeZaposlenika, results[0].idUloge
                );
            }
            return newUser;

        } catch (err) {
            return null;
        }
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO Zaposlenik (korisnickoIme, lozinka, email, imeZaposlenika, prezimeZaposlenika, idUloge) VALUES (" +
            `'${this.korisnickoIme}', '${this.lozinka}', '${this.email}', '${this.imeZaposlenika}', '${this.prezimeZaposlenika}', '${this.idUloge}')
            RETURNING *`;

        try {
            let korisnik = await db.query(sql, []);
            return korisnik

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async getKorisnikInfo(email) {
        const sql = `SELECT * FROM Zaposlenik WHERE email = '${email}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}