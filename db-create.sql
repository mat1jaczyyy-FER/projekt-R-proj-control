DROP TABLE IF EXISTS public.aktivacijskikodovi CASCADE;
DROP TABLE IF EXISTS public.dodijeljenje CASCADE;
DROP TABLE IF EXISTS public.prioritetzadatka CASCADE;
DROP TABLE IF EXISTS public.projekt CASCADE;
DROP TABLE IF EXISTS public.radina CASCADE;
DROP TABLE IF EXISTS public.session CASCADE;
DROP TABLE IF EXISTS public.status CASCADE;
DROP TABLE IF EXISTS public.uloga CASCADE;
DROP TABLE IF EXISTS public.vrstazadatka CASCADE;
DROP TABLE IF EXISTS public.zadatak CASCADE;
DROP TABLE IF EXISTS public.zaposlenik CASCADE;

CREATE TABLE public.aktivacijskikodovi (
    idkorisnika integer NOT NULL,
    aktivacijskikod character varying NOT NULL
);

CREATE TABLE public.dodijeljenje (
    idzaposlenika integer NOT NULL,
    idzadatka integer NOT NULL
);

CREATE TABLE public.prioritetzadatka (
    idprioriteta integer NOT NULL,
    nazivprioriteta character varying(30)
);

CREATE TABLE public.projekt (
    idprojekta integer NOT NULL,
    nazivprojekta character varying(30) NOT NULL,
    plandatpoc date,
    plandatkraj date,
    datpoc date,
    datkraj date,
    idstatusa integer NOT NULL,
    idvlasnika integer NOT NULL,
    opisprojekta character varying(100)
);

ALTER TABLE public.projekt ALTER COLUMN idprojekta ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.projekt_idprojekta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.radina (
    idprojekta integer NOT NULL,
    idzaposlenika integer NOT NULL
);

CREATE TABLE public.status (
    idstatusa integer NOT NULL,
    nazivstatusa character varying(30) NOT NULL
);

CREATE TABLE public.uloga (
    iduloge integer NOT NULL,
    nazivuloge character varying(30) NOT NULL
);

CREATE TABLE public.vrstazadatka (
    idvrste integer NOT NULL,
    nazivvrste character varying(30) NOT NULL
);

CREATE TABLE public.zadatak (
    idzadatka integer NOT NULL,
    opiszadatka character varying(100) NOT NULL,
    plandatpoc date NOT NULL,
    plandatkraj date NOT NULL,
    planbudzet double precision,
    budzet double precision,
    datpoc date,
    datkraj date,
    planbrsati integer,
    idvrste integer NOT NULL,
    idstatusa integer NOT NULL,
    idprioriteta integer NOT NULL,
    idprojekta integer NOT NULL,
    brsati integer
);

ALTER TABLE public.zadatak ALTER COLUMN idzadatka ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.zadatak_idzadatka_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.zaposlenik (
    idzaposlenika integer NOT NULL,
    korisnickoime character varying(30) NOT NULL,
    lozinka character varying(100) NOT NULL,
    email character varying(30) NOT NULL,
    imezaposlenika character varying(30) NOT NULL,
    prezimezaposlenika character varying(30) NOT NULL,
    iduloge integer NOT NULL,
    aktiviran boolean DEFAULT false NOT NULL
);

ALTER TABLE public.zaposlenik ALTER COLUMN idzaposlenika ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.zaposlenik_idzaposlenika_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.aktivacijskikodovi
    ADD CONSTRAINT aktivacijskikodovi_aktivacijskikod_key UNIQUE (aktivacijskikod);

ALTER TABLE ONLY public.aktivacijskikodovi
    ADD CONSTRAINT aktivacijskikodovi_idkorisnika_key UNIQUE (idkorisnika);

ALTER TABLE ONLY public.dodijeljenje
    ADD CONSTRAINT dodijeljenje_pkey PRIMARY KEY (idzaposlenika, idzadatka);

ALTER TABLE ONLY public.prioritetzadatka
    ADD CONSTRAINT prioritetzadatka_pkey PRIMARY KEY (idprioriteta);

ALTER TABLE ONLY public.projekt
    ADD CONSTRAINT projekt_pkey PRIMARY KEY (idprojekta);

ALTER TABLE ONLY public.radina
    ADD CONSTRAINT radina_pkey PRIMARY KEY (idprojekta, idzaposlenika);

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (idstatusa);

ALTER TABLE ONLY public.uloga
    ADD CONSTRAINT uloga_pkey PRIMARY KEY (iduloge);

ALTER TABLE ONLY public.vrstazadatka
    ADD CONSTRAINT vrstazadatka_pkey PRIMARY KEY (idvrste);

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_pkey PRIMARY KEY (idzadatka);

ALTER TABLE ONLY public.zaposlenik
    ADD CONSTRAINT zaposlenik_korisnickoime_key UNIQUE (korisnickoime);

ALTER TABLE ONLY public.zaposlenik
    ADD CONSTRAINT zaposlenik_pkey PRIMARY KEY (idzaposlenika);

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT constraint_fk_projekt FOREIGN KEY (idprojekta) REFERENCES public.projekt(idprojekta) ON DELETE CASCADE;

ALTER TABLE ONLY public.dodijeljenje
    ADD CONSTRAINT dodijeljenje_idzadatka_fkey FOREIGN KEY (idzadatka) REFERENCES public.zadatak(idzadatka) ON DELETE CASCADE;

ALTER TABLE ONLY public.dodijeljenje
    ADD CONSTRAINT dodijeljenje_idzaposlenika_fkey FOREIGN KEY (idzaposlenika) REFERENCES public.zaposlenik(idzaposlenika);

ALTER TABLE ONLY public.projekt
    ADD CONSTRAINT projekt_idstatusa_fkey FOREIGN KEY (idstatusa) REFERENCES public.status(idstatusa);

ALTER TABLE ONLY public.projekt
    ADD CONSTRAINT projekt_idvlasnika_fkey FOREIGN KEY (idvlasnika) REFERENCES public.zaposlenik(idzaposlenika) NOT VALID;

ALTER TABLE ONLY public.radina
    ADD CONSTRAINT radina_idprojekta_fkey FOREIGN KEY (idprojekta) REFERENCES public.projekt(idprojekta) ON DELETE CASCADE;

ALTER TABLE ONLY public.radina
    ADD CONSTRAINT radina_idzaposlenika_fkey FOREIGN KEY (idzaposlenika) REFERENCES public.zaposlenik(idzaposlenika);

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_idprioriteta_fkey FOREIGN KEY (idprioriteta) REFERENCES public.prioritetzadatka(idprioriteta);

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_idstatusa_fkey FOREIGN KEY (idstatusa) REFERENCES public.status(idstatusa);

ALTER TABLE ONLY public.zadatak
    ADD CONSTRAINT zadatak_idvrste_fkey FOREIGN KEY (idvrste) REFERENCES public.vrstazadatka(idvrste);

ALTER TABLE ONLY public.zaposlenik
    ADD CONSTRAINT zaposlenik_iduloge_fkey FOREIGN KEY (iduloge) REFERENCES public.uloga(iduloge);
