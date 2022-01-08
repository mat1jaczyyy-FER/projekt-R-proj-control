const db = require('../database');

module.exports = class Projekt {
    constructor (nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, idVlasnika, opisProjekta) {
        this.nazivProjekta = nazivProjekta;
        this.planDatPoc = planDatPoc;
        this.planDatKraj = planDatKraj;
        this.datPoc = datPoc;
        this.datKraj = datKraj;
        this.idStatusa = idStatusa;
        this.idVlasnika = idVlasnika;
        this.opisProjekta = opisProjekta;
    }

    async apply() {
        return await db.query(
            `INSERT INTO projekt (nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, idVlasnika, opisProjekta)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [this.nazivProjekta, this.planDatPoc, this.planDatKraj, this.datPoc, this.datKraj, this.idStatusa, this.idVlasnika, this.opisProjekta]
        );
    }

    static async update(idProjekta, nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, opisProjekta) {
        return await db.query(
            `UPDATE projekt SET nazivProjekta = $1, planDatPoc = $2, planDatKraj = $3,
             datPoc = $4, datKraj = $5, idStatusa = $6, opisProjekta = $7
             WHERE idProjekta = $8 RETURNING *`,
            [nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, opisProjekta, idProjekta]
        );
    }

    static async delete(idProjekta) {
        return await db.query(
            `DELETE FROM projekt WHERE idProjekta = $1 RETURNING *`,
            [idProjekta]
        );
    }

    static async getProjektiWhereUserIsOwner(idVlasnika) {
        return (await db.query(
            `SELECT * FROM projekt WHERE idVlasnika = $1`,
            [idVlasnika]
        )).rows;
    }

    static async getAllUserProjects(idVlasnika) {
        return (await db.query(
            `SELECT projekt.* FROM projekt NATURAL JOIN radiNa WHERE idZaposlenika = $1`,
            [idVlasnika]
        )).rows;
    }

    static async getProjekt(idProjekta) {
        return (await db.query(
            `SELECT * FROM projekt WHERE idProjekta = $1`,
            [idProjekta]
        )).rows;
    }
}