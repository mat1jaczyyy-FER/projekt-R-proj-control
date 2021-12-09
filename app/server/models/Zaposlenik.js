const db = require('../database');

module.exports = class Zaposlenik {
    constructor (korisnickoIme, lozinka, email, imeZaposlenika, prezimeZaposlenika, idUloge) {
        this.korisnickoIme = korisnickoIme;
        this.lozinka = lozinka;
        this.email = email;
        this.imeZaposlenika = imeZaposlenika;
        this.prezimeZaposlenika = prezimeZaposlenika;
        // todo idUloge
    }

    static async fetchByEmail(email) {
        // todo fix sql injection vuln
        const sql = `SELECT * FROM Zaposlenik WHERE email = '${email}'`;
        try {
            const results = (await db.query(sql, [])).rows;
            let newUser = new Zaposlenik();
            if (results.length > 0) {
                newUser = new Zaposlenik(
                    results[0].korisnicko_ime, results[0].lozinka, results[0].email,
                    results[0].imeZaposlenika, results[0].prezimeZaposlenika
                );
            }
            return newUser;

        } catch (err) {
            return null;
        }
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO Zaposlenik (korisnickoIme, lozinka, email, imeZaposlenika, prezimeZaposlenika) VALUES ('" +
            `${this.korisnickoIme}, ${this.lozinka}, ${this.email}, ${this.imeZaposlenika}, ${this.prezimeZaposlenika})`;

        try {
            await db.query(sql, []);

        } catch (err) {
            console.log(err);
            throw err
        }
    }
}