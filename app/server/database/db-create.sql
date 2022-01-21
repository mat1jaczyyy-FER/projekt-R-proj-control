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
