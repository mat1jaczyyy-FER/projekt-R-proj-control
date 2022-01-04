CREATE TABLE Uloga
(
  idUloge INT NOT NULL,
  nazivUloge VARCHAR(30) NOT NULL,
  PRIMARY KEY (idUloge)
);

CREATE TABLE VrstaZadatka
(
  idVrste INT NOT NULL,
  nazivVrste VARCHAR(30) NOT NULL,
  PRIMARY KEY (idVrste)
);

CREATE TABLE Status
(
  idStatusa INT NOT NULL,
  nazivStatusa VARCHAR(30) NOT NULL,
  PRIMARY KEY (idStatusa)
);

CREATE TABLE PrioritetZadatka
(
  idPrioriteta INT NOT NULL,
  nazivPrioriteta VARCHAR(30),
  PRIMARY KEY (idPrioriteta)
);

CREATE TABLE Projekt
(
  idProjekta INT NOT NULL,
  nazivProjekta VARCHAR(30) NOT NULL,
  planDatPoc DATE,
  planDatKraj DATE,
  datPoc DATE NOT NULL,
  datKraj DATE NOT NULL,
  idStatusa INT NOT NULL,
  idVlasnika INT NOT NULL,
  opisProjekta VARCHAR(100),
  PRIMARY KEY (idProjekta),
  FOREIGN KEY (idStatusa) REFERENCES Status(idStatusa),
  FOREIGN KEY (idVlasnika) REFERENCES Zaposlenik(idZaposlenika)
);

CREATE TABLE Zaposlenik
(
  idZaposlenika INT NOT NULL,
  korisnickoIme VARCHAR(30) NOT NULL,
  lozinka VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  imeZaposlenika VARCHAR(30) NOT NULL,
  prezimeZaposlenika VARCHAR(30) NOT NULL,
  idUloge INT NOT NULL,
  PRIMARY KEY (idZaposlenika),
  FOREIGN KEY (idUloge) REFERENCES Uloga(idUloge),
  UNIQUE (korisnickoIme)
);

CREATE TABLE radiNa
(
  idProjekta INT NOT NULL,
  idZaposlenika INT NOT NULL,
  PRIMARY KEY (idProjekta, idZaposlenika),
  FOREIGN KEY (idProjekta) REFERENCES Projekt(idProjekta),
  FOREIGN KEY (idZaposlenika) REFERENCES Zaposlenik(idZaposlenika)
);

CREATE TABLE Zadatak
(
  idZadatka INT NOT NULL,
  opisZadatka VARCHAR(100) NOT NULL,
  planDatPoc DATE,
  planDatKraj DATE,
  planBudzet FLOAT,
  budzet FLOAT NOT NULL,
  datPoc DATE NOT NULL,
  datKraj DATE NOT NULL,
  planBrSati INT,
  brSati INT,
  idVrste INT NOT NULL,
  idStatusa INT NOT NULL,
  idPrioriteta INT NOT NULL,
  idProjekta INT NOT NULL,
  PRIMARY KEY (idZadatka),
  FOREIGN KEY (idVrste) REFERENCES VrstaZadatka(idVrste),
  FOREIGN KEY (idStatusa) REFERENCES Status(idStatusa),
  FOREIGN KEY (idPrioriteta) REFERENCES PrioritetZadatka(idPrioriteta),
  FOREIGN KEY (idProjekta) REFERENCES Projekt(idProjekta)
);

CREATE TABLE dodijeljenJe
(
  idZaposlenika INT NOT NULL,
  idZadatka INT NOT NULL,
  PRIMARY KEY (idZaposlenika, idZadatka),
  FOREIGN KEY (idZaposlenika) REFERENCES Zaposlenik(idZaposlenika),
  FOREIGN KEY (idZadatka) REFERENCES Zadatak(idZadatka)
);

-- connect-pg-simple A simple, minimal PostgreSQL session store for Express/Connect
-- this should be omitted and generated with `npm run seed-session` if necessary
CREATE TABLE session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE
CREATE INDEX IDX_session_expire ON session(expire)
