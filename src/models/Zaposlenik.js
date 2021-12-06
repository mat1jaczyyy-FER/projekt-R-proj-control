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

    static async fetchByKorisnickoIme(korisnickoIme) {
        // todo fix sql injection vuln
        const sql = `SELECT * FROM korisnik WHERE korisnickoIme = '${username}'`;
        try {
            const results = (await db.query(sql, [])).rows;
            let newUser = new Korisnik()
            if( results.length > 0 ) {
                newUser = new Korisnik(results[0].korisnicko_ime, results[0].lozinka, results[0].ime, results[0].prezime,
                     results[0].ima_ulogu, /*results[0].zahtjeva_ulogu,*/ results[0].sifra_ulica)
            }
            return newUser;
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO korisnik (korisnickoIme, lozinka, email, imeZaposlenika, prezimeZaposlenika) VALUES ('" +
        `${this.korisnickoIme}, ${this.lozinka}, ${this.email}, ${this.imeZaposlenika}, ${this.prezimeZaposlenika})`;
        try {
            await db.query(sql, []);
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    
    getKorisnickoIme() {
        return this.korisnickoIme;
    }

    checkCredentials(username, password) {
        return this.korisnickoIme === username && this.lozinka === password;
    }
}