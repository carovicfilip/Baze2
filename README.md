# 'Vesti sve o svemu'
## Uvod
  
Projekat "Vesti sve o svemu" je web aplikacija koja pruža korisnicima mogućnost čitanja, pretrage i interakcije sa vestima. Ova aplikacija je izrađena korišćenjem Java programskog jezika za backend logiku, dok je za frontend korisnički interfejs korišćen React framework, popularni framework koji omogućava brzo i jednostavno kreiranje responzivnih web stranica. Za stilizovanje i brži razvoj korisničkog interfejsa korišćen je Bootstrap.

## Funkcionalni zahtevi
  
2.1 Pregled vesti
Korisnici mogu pregledati vesti na portalu, prikazujući se aktuelne vesti na početnoj stranici, sa mogućnošću pretrage i pristupa arhivi vesti.

2.2 Struktura vesti
Vesti su definisane naslovom, tekstom koji može biti formatiran shodno nasim zeljama (npr. podebljan i kurziv tekst, naslovi i podnaslovi), postoje i tagovi radi lakšeg indeksiranja i pretrage. Svaka vest pripada određenoj rubrici (politika, sport, zabava, tehnologija).

2.3 Pretraga vesti
Korisnici mogu pretraživati vesti po tagovima, datumu ili da vide sve vesti u arhivi.

2.4 Interakcija korisnika
Korisnici mogu lajkovati ili dislajkovati vesti, kao i ostavljati komentare. Za ove akcije nije potrebna prijava, korisnik može uneti jednokratno korisničko ime pri unošenju komentara. Komentare je takođe moguće lajkovati i dislajkovati, uz prikaz broja lajkova i dislajkova.

2.5 Administracija vesti
Novinari mogu kreirati nove vesti unutar određene rubrike, čuvajući ih u draft stanju kao radnu verziju. Kada vest bude završena, novinar je šalje uredniku na pregledanje. Nakon odobrenja urednika, vest postaje vidljiva na sajtu. Svaka promena vesti zahteva novo odobrenje. Urednici mogu odobravati i brisati vesti unutar svojih nadležnih rubrika.

2.6 Sistem privilegija
Postoji razlika između novinara i urednika. Novinari mogu dodavati članke samo svoje rubrike, dok urednici imaju dodatne privilegije nad više rubrika ili kao glavni urednici. Samo glavni urednik može registrovati nove novinare i dodeljivati im rubrike. Dok obican urednik ima mogucnost potvrde clanka koji je novinar poslao na validaciju.

## Instalacija i pokretanje
  
 3.1. Kloniranje repozitorijuma sa GitHub-a:
 
Posetite GitHub repozitorijum koji želite da klonirate. Kliknite na dugme "Code" i kopirajte URL repozitorijuma. Otvorite terminal na svom računaru i navigirajte do direktorijuma u koji želite da klonirate repozitorijum. Izvršite sledeću komandu:

- git clone https://github.com/carovicfilip/Baze2

3.2. Podešavanje XAMPP servera i MySQL baze podataka:

Preuzmite XAMPP server sa zvanične web stranice: https://www.apachefriends.org/download.html. Pratite uputstva za instalaciju XAMPP servera na vašem računaru. Nakon instalacije, pokrenite XAMPP server.

3.3. Pokretanje backend-a

Navigirajte do direktorijuma backend u kloniranom repozitorijumu. Pokrenite backend koristeći dugme 'Run'.

3.4. Pokretanje frontend-a

Navigirajte do direktorijuma frontend u kloniranom repozitorijumu. Pokrenite frontend koristeći sledeće komande:


- cd frontend
- npm install
- npm run dev

## Autor

Ime Prezime: Filip Ćarovć 612/2019
