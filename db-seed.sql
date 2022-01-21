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

INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (38, '428693449e5dda8b20b5388fa80ea671f98b8ea0deb98ab061');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (39, 'fefe0257195978ad5b563a56469b1f9ba25c4100409256923b');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (40, '5d15c06f6c30f5bbfaa1a59b94cbf03d76b9fa783a1e05809d');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (41, '533d9ef7ee17dea477e98a0123377b73f0cf444900c87a19e8');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (42, '50009f539877c19fd7a5adcd0b1c48dee03e5e78a309219428');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (43, 'bb4a9a8061ce394d3d1941b919851324d2feb15b114ef30e67');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (45, '2734f838663dad1a5a5afc0edb0df435557c1cd1f49761ea37');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (47, 'a440ab3c55e1696f21aabc428f3c0f383e0b531bcb2dd7e136');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (48, '8f248116f3a440d87714d9f2003f0679292a90883ff97e9b8d');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (49, '3d332ab6402adeb21940bc0c1154e43a6f66fe2cc3bcb5d5fb');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (50, '078d92eb1f81dacd190dcb764667d2bcb6f5d8ec0af6855a79');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (51, '923ec18dcaefb33c40bfc14f2f0d627a291b4d14e6c973a758');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (52, 'd3192f1aea64ddb2c2b4f5a9634b65d1278a124f9a588c3a98');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (53, '840762cb77f6c12dda1adbae9103e1b70a97e5c54cd59b700f');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (54, '761e7636d121a185979382af926f129a39e8105194a68e52e4');
INSERT INTO public.aktivacijskikodovi (idkorisnika, aktivacijskikod) VALUES (55, '156228ef922b3b49fa83a444a250a3e90a7bd8be41661df71f');

INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 48);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 49);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 50);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 51);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (25, 49);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 60);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 61);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 62);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (37, 69);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 82);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 83);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 84);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 85);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 86);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (30, 87);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 88);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (37, 90);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 91);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 93);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 94);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 95);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 96);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 97);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 98);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 99);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 100);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 101);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 102);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 103);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 104);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 105);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (35, 106);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 108);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 109);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (43, 69);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (37, 74);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (37, 92);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 89);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (42, 110);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (26, 118);
INSERT INTO public.dodijeljenje (idzaposlenika, idzadatka) VALUES (56, 119);

INSERT INTO public.prioritetzadatka (idprioriteta, nazivprioriteta) VALUES (1, 'nizak');
INSERT INTO public.prioritetzadatka (idprioriteta, nazivprioriteta) VALUES (2, 'srednji');
INSERT INTO public.prioritetzadatka (idprioriteta, nazivprioriteta) VALUES (3, 'visok');

INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (37, 'test projekt', '2019-10-06', '2024-10-10', NULL, NULL, 1, 25, 'asdfhjlk');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (39, 'test za brisanje', '2022-01-09', '2022-01-09', NULL, NULL, 1, 26, 'za obrisati');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (38, 'Projekt testni jos jeadn', '2022-01-16', '2022-01-23', '2022-01-10', NULL, 2, 37, 'gsdfgfddfggfd');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (40, 'Projekt test 321', '2022-01-23', '2022-01-30', '2022-01-11', '2022-01-11', 3, 37, 'projekt');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (30, 'Novi Makijev projekt', '2022-01-08', '2022-01-09', NULL, NULL, 1, 26, 'testni projekt');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (21, 'ProjControl', '2021-10-19', '2022-01-21', '2021-10-19', '2022-01-11', 2, 26, 'Izrada web aplikacije za upravljanje projektima');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (43, 'LukaProjekt', '2022-01-13', '2022-01-21', '2022-01-11', NULL, 2, 42, 'TEST123');
INSERT INTO public.projekt (idprojekta, nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta) OVERRIDING SYSTEM VALUE VALUES (47, 'proj test', '2022-01-22', '2022-01-23', NULL, NULL, 1, 56, 'fsdgffd');

INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 26);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 35);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (30, 26);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 30);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (38, 37);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (40, 37);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 37);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 25);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 27);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (43, 42);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (21, 42);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (38, 43);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (38, 42);
INSERT INTO public.radina (idprojekta, idzaposlenika) VALUES (47, 56);

INSERT INTO public.status (idstatusa, nazivstatusa) VALUES (1, 'U pripremi');
INSERT INTO public.status (idstatusa, nazivstatusa) VALUES (2, 'Rješava se');
INSERT INTO public.status (idstatusa, nazivstatusa) VALUES (3, 'Gotov');
INSERT INTO public.status (idstatusa, nazivstatusa) VALUES (4, 'Pauziran');
INSERT INTO public.status (idstatusa, nazivstatusa) VALUES (5, 'Odbačen');

INSERT INTO public.uloga (iduloge, nazivuloge) VALUES (1, 'admin');
INSERT INTO public.uloga (iduloge, nazivuloge) VALUES (2, 'zaposlenik');

INSERT INTO public.vrstazadatka (idvrste, nazivvrste) VALUES (1, 'Jednostavan');
INSERT INTO public.vrstazadatka (idvrste, nazivvrste) VALUES (2, 'Kompliciran');

INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (118, 'test12345', '2022-01-05', '2022-01-20', NULL, NULL, '2022-01-20', NULL, 4, 1, 4, 2, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (89, 'Test za završetak zadatka', '2021-10-20', '2022-01-10', NULL, NULL, '2022-01-16', '2022-01-10', 1, 1, 2, 1, 21, 11);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (85, 'Izrada dokumentacije', '2021-10-20', '2022-01-18', 0, 0, '2021-10-20', '2022-01-18', 10, 1, 2, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (119, 'zadatak', '2022-01-21', '2022-01-23', NULL, NULL, '2022-01-21', NULL, 1, 1, 2, 1, 47, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (97, 'Brisanje projekta iz baze', '2021-10-20', '2021-12-22', 0, 0, '2021-10-20', '2021-12-21', 1, 1, 3, 1, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (103, 'Popraviti dohvaćanje svih projekata na kojima korisnik radi iz baze', '2021-10-20', '2022-01-09', 0, 0, '2021-10-20', '2022-01-09', 1, 1, 3, 3, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (102, 'Dodati email verifikaciju kod registracije', '2021-10-20', '2022-01-09', 0, 0, '2021-10-20', '2022-01-08', 2, 1, 3, 3, 21, 3);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (99, 'Obrisati nepotrebne tablice iz baze (radniList i grupaZadataka)', '2021-10-20', '2022-01-04', 0, 0, '2021-10-20', '2022-01-04', 2, 1, 3, 3, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (104, 'Dohvaćanje svih osoba na nekom projektu i broja njihovih zadataka na tom projektu iz baze', '2021-10-20', '2022-01-09', 0, 0, '2021-10-20', '2022-01-09', 2, 1, 3, 2, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (106, 'Dohvaćanje imena svih korisnika iz baze', '2021-10-20', '2022-01-10', 0, 0, '2021-10-20', '2022-01-10', 1, 1, 3, 2, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (92, 'bjhgfhgfghf', '2021-10-20', '2022-01-23', NULL, NULL, '2022-01-16', NULL, 1, 1, 2, 2, 38, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (83, 'Ispitati slične alate', '2021-10-20', '2021-11-09', 0, 0, '2021-10-20', '2021-11-09', 2, 1, 3, 1, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (48, 'Popunjavanje baze podataka', '2021-10-20', '2022-01-07', 0, 0, '2021-10-20', NULL, 2, 1, 2, 2, 21, 8);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (80, 'Uspostava projekta', '2021-10-20', '2021-11-05', 0, 0, '2021-10-20', '2021-11-04', 5, 1, 3, 3, 21, 5);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (61, 'Jednostavni prikaz projekata', '2021-10-20', '2022-01-09', 0, 0, '2021-10-20', '2022-01-09', 1, 1, 3, 2, 21, 3);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (90, 'zadatak za raditio', '2021-10-20', '2022-01-30', NULL, NULL, '2021-10-20', NULL, 1, 1, 2, 1, 40, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (81, 'Određivanje zadataka', '2021-10-20', '2021-11-05', 0, 0, '2021-10-20', '2021-11-04', 3, 1, 3, 3, 21, 3);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (51, 'Popraviti navbar', '2021-10-20', '2022-01-08', 0, 0, '2021-10-20', NULL, 1, 1, 3, 1, 21, 5);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (87, 'Pomoć na frontendu', '2021-10-20', '2022-01-19', 0, 0, '2021-10-20', '2022-01-19', 15, 1, 2, 3, 21, 20);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (86, 'Popunjavanje baze podataka', '2021-10-20', '2022-01-19', 0, 0, '2021-10-20', '2022-01-18', 2, 1, 2, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (93, 'Dodavanje novog projekta u bazu', '2021-10-20', '2021-12-14', 0, 0, '2021-10-20', '2021-12-14', 1, 1, 3, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (62, 'Ispis todo liste', '2021-10-20', '2021-12-18', 0, 0, '2021-10-20', '2022-01-18', 1, 1, 3, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (82, 'Opis funkcionalnosti 1-9', '2021-10-20', '2021-11-07', 0, 0, '2021-10-20', '2021-11-07', 2, 1, 3, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (88, 'Testiranje za pocetak rada na zadatku', '2021-10-20', '2022-01-12', NULL, NULL, '2021-10-20', NULL, 1, 1, 2, 3, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (94, 'Dohvaćanje svih vlastitih projekata nekog korisnika', '2021-10-20', '2021-12-14', 0, 0, '2021-10-20', '2021-12-14', 1, 1, 3, 1, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (78, 'Formiranje tima', '2021-10-20', '2021-10-25', 0, 0, '2021-10-20', '2021-10-25', 5, 1, 3, 3, 21, 5);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (79, 'Upoznavanje tima', '2021-10-20', '2021-10-25', 0, 0, '2021-10-20', '2021-10-25', 3, 1, 3, 3, 21, 3);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (70, 'Popravak tokena', '2021-10-20', '2021-12-04', 0, 0, '2021-10-20', '2021-12-04', 2, 1, 3, 3, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (77, 'Dovrsiti dokumentaciju', '2021-10-20', '2021-02-15', NULL, NULL, '2021-10-20', NULL, 5, 1, 3, 2, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (76, 'Kreirati relacijski model baze podataka', '2021-10-20', '2021-11-16', NULL, NULL, '2021-10-20', '2021-11-17', 1, 1, 3, 3, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (73, 'Izmjena statusa projekta', '2021-10-20', '2022-01-07', 0, 0, '2021-10-20', '2022-01-08', 1, 1, 3, 2, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (110, 'znjbra', '2021-10-20', '2022-01-12', NULL, NULL, '2022-01-19', NULL, 5, 1, 2, 1, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (115, 'test odbaceni', '2021-10-20', '2022-01-23', NULL, NULL, NULL, NULL, 1, 1, 5, 1, 38, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (69, 'hdfghgffhgfgh', '2021-10-20', '2022-01-16', NULL, NULL, '2021-10-20', '2022-01-16', 1, 1, 3, 2, 38, 0);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (111, 'prvi', '2021-10-20', '2022-01-11', NULL, NULL, NULL, NULL, 1, 1, 1, 1, 30, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (74, 'napraviti nesto', '2021-10-20', '2022-01-16', NULL, NULL, '2022-01-16', '2022-01-16', 1, 1, 5, 1, 38, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (113, 'test ostalih', '2021-10-20', '2022-01-22', NULL, NULL, NULL, NULL, 1, 1, 2, 1, 38, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (112, 'testiranje edit 6', '2021-10-20', '2022-01-16', NULL, NULL, '2022-01-14', '2022-01-14', 1, 1, 2, 2, 30, 5);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (60, 'Izraditi prikaz grafova', '2021-10-20', '2022-01-09', 0, 0, '2021-10-20', '2022-01-09', 1, 1, 2, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (96, 'Dohvaćanje naziva uloge preko id-a', '2021-10-20', '2021-12-22', 0, 0, '2021-10-20', '2021-12-21', 1, 1, 3, 1, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (109, 'Izrada prikaza project-overviewa', '2021-10-20', '2022-01-09', NULL, NULL, '2021-10-20', '2022-01-09', 2, 1, 1, 3, 21, 4);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (108, 'Kompletirati i poslati plan projekta', '2021-10-20', '2021-10-30', NULL, NULL, '2021-10-20', '2021-10-30', 2, 1, 1, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (98, 'Promjena informacija o projektu u bazi', '2021-10-20', '2021-12-22', 0, 0, '2021-10-20', '2021-12-21', 2, 1, 3, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (105, 'Dodavanje korisnika na projekt i spremiti u bazu', '2021-10-20', '2022-01-10', 0, 0, '2021-10-20', '2022-01-10', 1, 1, 3, 2, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (117, 'neki', '2021-10-20', '2022-01-16', NULL, NULL, '2022-01-16', '2022-01-16', NULL, 1, 5, 1, 21, 5);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (116, 'zadatak', '2021-10-20', '2022-01-16', NULL, NULL, '2022-01-16', NULL, 5, 1, 4, 3, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (49, 'Dogovoriti sastanak s profesorom', '2021-10-20', '2022-01-06', 0, 0, '2021-10-20', '2022-01-06', 1, 1, 1, 3, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (95, 'Dohvaćanje naziva statusa preko id-a', '2021-10-20', '2021-12-22', 0, 0, '2021-10-20', '2021-12-21', 1, 1, 3, 1, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (91, 'test za dodijeljenje', '2021-10-20', '2022-01-11', 0, 0, '2021-10-20', NULL, 69, 1, 2, 3, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (50, 'Napraviti task-box', '2021-10-20', '2022-01-07', 0, 0, '2021-10-20', NULL, 1, 1, 2, 3, 21, NULL);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (71, 'Kreiranje novog projekta', '2021-10-20', '2021-12-18', 0, 0, '2021-10-20', '2021-12-21', 1, 1, 3, 2, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (72, 'Dodavanje novog zadatka', '2021-10-20', '2022-01-07', 0, 0, '2021-10-20', '2022-01-08', 1, 1, 3, 2, 21, 2);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (101, 'Dohvaćanje naziva vrste zadataka preko id-a i dohvaćanje svih vrsta zadataka iz baze', '2021-10-20', '2022-01-07', 0, 0, '2021-10-20', '2022-01-06', 1, 1, 3, 1, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (100, 'Dohvaćanje naziva prioriteta preko id-a i dohvaćanje svih prioriteta iz baze', '2021-10-20', '2022-01-07', 0, 0, '2021-10-20', '2022-01-06', 1, 1, 3, 1, 21, 1);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (84, 'Probni login', '2021-10-20', '2021-12-23', 0, 0, '2021-10-20', '2021-12-23', 2, 1, 3, 2, 21, 5);
INSERT INTO public.zadatak (idzadatka, opiszadatka, plandatpoc, plandatkraj, planbudzet, budzet, datpoc, datkraj, planbrsati, idvrste, idstatusa, idprioriteta, idprojekta, brsati) OVERRIDING SYSTEM VALUE VALUES (75, 'Kreirati ER model baze podataka', '2021-10-20', '2021-11-02', NULL, NULL, '2021-10-20', '2021-11-02', 2, 1, 3, 3, 21, 4);

INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (1, 'admin', 'admin123', 'admin@gmail.com', 'Adminko', 'Adminic', 1, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (43, 'mrki', '$2b$10$BKyR93d1tJZ/gyoxB5dFFeDedc.aTu/Vqwle3Wx/HBaT.inxTNXsq', 'filip.marcec@gmail.com', 'Filip ', 'Marčec', 2, false);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (42, 'LukaCava', '$2b$10$vTXiObPeCBEq5mgzheMFSe6LhXeNUaDFEJgbjW1gn7SlFJRGnxqjS', 'luka.cavalli@fer.hr', 'Luka', 'Cavalli', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (45, 'bla123', '$2b$10$hAk1aZ3ItAo1CupHZkMmI.Ra0p3zjKPp8J2sQ6T24/iOHxZYoXpBe', 'finiminigini@gmail.com', 'Bla', 'Test', 2, false);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (47, 'BigW', '$2b$10$2SC4/iPP8xbDuATcOY8HCePlyglV7VqivFPf8hazFfz7UNfbUSgrO', 'vbveco@gmail.com', 'Big', 'William', 2, false);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (25, 'dm52456', '$2b$10$8g27zzwSFO95jHVflJjSBuyzAR10IgWD73h7dnuYj1DwDfd7zPdXi', 'dominik.matijaca@fer.hr', 'Dominik', 'Matijaca', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (26, 'fm52514', '$2b$10$y/E.OJPp7ohdRCHBjhH0G.It8/Xg/hYhTcVRXo1weD2sOKcu943yu', 'filip.marcec@fer.hr', 'Filip', 'Marčec', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (27, 'dummy', '$2b$10$ETE2kh7yi7/OpUeCDx5X0u.CW8U47NsqWlOhyrvkCYZJUn8Alt2hi', 'dummy@gmail.com', 'dum', 'dam', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (56, 'mcme', '$2b$10$Wf8h3KzO7SAupYLGI4NFHeJrKxNVXpMDLWu9edLemFmNPDS6PBk7.', 'mcugovcan@gmail.com', 'MC', 'Hammer', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (35, 'mo52775', '$2b$10$1.IlJ4OoW3zNx0Qs8h1LqeMMKogjRoCBu1NSIwmlmsb9Cdc9GOti2', 'marko.okresa@fer.hr', 'Marko', 'Okreša', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (30, 'fc52258', '$2b$10$nkfoNnUN7Kyshy5ar/8orOVjzX6OPDBjglo33kJjtqhUeLv5nfhZG', 'fc52258@fer.hr', 'Filip', 'Cindrić', 2, true);
INSERT INTO public.zaposlenik (idzaposlenika, korisnickoime, lozinka, email, imezaposlenika, prezimezaposlenika, iduloge, aktiviran) OVERRIDING SYSTEM VALUE VALUES (37, 'mc52657', '$2b$10$HX3c5i2YLEZRbbQpRRGTX.QzZMNaSySIh7/dzRD2yETmJ6iriSqEC', 'mc52657@fer.hr', 'Mihael', 'Cugovčan', 2, true);

SELECT pg_catalog.setval('public.projekt_idprojekta_seq', 48, true);
SELECT pg_catalog.setval('public.zadatak_idzadatka_seq', 119, true);
SELECT pg_catalog.setval('public.zaposlenik_idzaposlenika_seq', 56, true);

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
