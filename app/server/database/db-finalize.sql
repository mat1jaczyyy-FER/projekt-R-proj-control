
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
