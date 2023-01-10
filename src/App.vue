<template>
  <div id="app" class="container"><br><br>
    <h3 class="d-flex justify-content-center">Car Sharing Platform</h3>
    <h5 class="d-flex justify-content-center">NMSI 2k23</h5>
    <br><br>
    <div v-if="!uspjesanLogin">
      <section class=" text-center text-lg-start">
        <div class="card mb-3">
          <div class="row g-0 d-flex align-items-center">
            <div class="col-lg-4 d-none d-lg-flex">
              <img src="https://i0.wp.com/supercarhiredubai.com/wp-content/uploads/2021/07/Volkswagen-T-Roc-Rental-Dubai.jpg?fit=1080%2C1080" alt="Trendy Pants and Shoes"
                class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
            </div>
            <div class="col-lg-8">
              <div class="card-body py-5 px-md-5">

                <form>
                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <input type="username" class="form-control" v-model="username"/>
                    <label class="form-label" for="form2Example1">Username</label>
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <input type="password" class="form-control" v-model="password">
                    <label class="form-label" for="form2Example2">Password</label>
                  </div>

                  <!-- Submit button -->
                  <button type="button" class="btn btn-primary btn-block mb-4" @click="prijava()">Sign in</button>
                  <button type="button" class="btn btn-primary btn-block mb-4">Sign up</button> <br>
                  <label @click="posjetilacLogin()">Nastavite kao posjetilac</label>

                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!--NAVIGACIJSKI BAR-->
    <p class="d-flex justify-content-center" v-if="uspjesanLogin && !guestAcc">Logirani korisnik: {{ account.ime }} {{ account.prezime }}</p>
    <div v-if="uspjesanLogin" class="navbar navbar-expand-sm bg-light navbar-dark d-flex justify-content-center">
      <ul class="navbar-nav">
        <li class="nav-item m-1">
          <button class="btn btn-light btn-outline-primary"
          @click="prikaziUsluge()">Usluge</button>
        </li>
        <li class="nav-item m-1">
          <button class="btn btn-light btn-outline-primary"
          @click="prikaziKompanije()">Kompanije</button>
        </li>
        <li class="nav-item m-1">
          <button class="btn btn-light btn-outline-primary"
          @click="nazadNaPrijavu()" v-if="guestAcc">Prijava/Registracija</button>
        </li>
        <li class="nav-item m-1">
          <button class="btn btn-light btn-outline-primary"
          @click="prikaziAccount()" v-if="!guestAcc">Korisnicki racun</button>
        </li>
        <li class="nav-item m-1">
          <button class="btn btn-light btn-outline-primary"
          @click="odjava()" v-if="!guestAcc">Odjava</button>
        </li>
      </ul>
    </div>
    <!--USLUGE TABELA-->
    <div v-if="prikazUsluga">
        <button type="button" class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#modal" @click="addClick()"
        v-bind:hidden="true">Dodaj vozilo</button>
        <table class="table table-stripped justify-content-center">
            <thead>
                <tr>
                    <th>Slika</th>
                    <th>Model</th>
                    <th>Cijena</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in usluge">
                    <td><img :src="u.urlslike" width="125px" height="100px"></td>
                    <td>{{u.model}}</td>
                    <td>{{u.cijena}} BAM/dan</td>
                    <td>
                        <button type="button" class="btn btn-light mr-1"
                        data-bs-toggle="modal" data-bs-target="#modal" @click="infoClick(u)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="detaljiModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{jednaUsluga.model}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <img :src="jednaUsluga.urlslike" width="470" height="auto"> <br><br>
                            <label><b>Model:</b></label>
                            <label>{{ jednaUsluga.model }}</label> <br>
                            <label><b>Vrsta:</b></label> 
                            <label>{{ jednaUsluga.vrsta }}</label> <br>
                            <label><b>Broj sjedišta:</b></label>
                            <label>{{ jednaUsluga.brojSjedista }}</label> <br>
                            <label><b>Snaga:</b></label>
                            <label>{{ jednaUsluga.snaga }}</label> <br>
                            <label><b>Datum isteka registracije:</b></label>
                            <label>{{ jednaUsluga.datumIstekaRegistracije}}</label> <br>
                            <label><b>Kompanija:</b></label>
                            <label>{{ jednaUsluga.nazivKompanije }}</label> <br><br>
                            <label><b>Cijena:</b></label>
                            <label>{{ jednaUsluga.cijena }} BAM/dan</label> <br><br>
                        </div>
                        <button type="button" class="btn btn-primary" v-if="!guestAcc && !prikazZaNovuRezervaciju" @click="novaRezervacija()">Rezerviši</button>
                        <div  v-if="this.prikazZaNovuRezervaciju">
                          <hr>
                          <label>Od dana: </label> <br>
                          <input type="datetime-local" v-model="datumOdNovaRez"> <br><br>
                          <label>Do dana:</label><br>
                          <input type="datetime-local" v-model="datumDoNovaRez"> <br>
                          <hr>
                          <label>Dodatna usluga:</label> <br> <br>
                          <select v-model="IdDodatneUslugeNoveRezervacije" class="input-group-text">
                                <option class="form-control" v-for="x of sveDodatneUsluge" :key="x.iddodatneUsluge" :value="x.iddodatneUsluge" >{{x.nazivDodatneUsluge}} ({{ x.cijena }} BAM/dan)</option>
                            </select>
                            <br>
                            <hr>
                          <button type="button" class="btn btn-primary" @click="upisRezervacije()">Rezerviši</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--KOMPANIJE TABELA-->
    <div v-if="prikazKompanija">
        <table class="table table-stripped justify-content-center">
            <thead>
                <tr>
                    <th>Naziv kompanije</th>
                    <th>Lokacija</th>
                    <th>Kontakt</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="k in kompanije">
                    <td>{{ k.nazivKompanije }}</td>
                    <td>{{ k.lokacija }}</td>
                    <td>{{ k.kontakt }}</td>
                    <td>
                        <button type="button" class="btn btn-light mr-1" 
                        data-bs-toggle="modal" data-bs-target="#modalKurs" @click="prikazRecenzijaZaKompaniju(k)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection" viewBox="0 0 16 16">
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                            </svg>
                        </button>     
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="modalKurs" tabindex="-1" aria-labelledby="kursModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{jednaKompanija.nazivKompanije}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="close"></button>
                    </div>
                    <div class="modal-body">
                        <label style="text-align: center;"><b>{{jednaKompanija.opisKompanije}}</b></label>
                        <hr>
                        <label><b>Lokacija:</b></label>
                        <label>{{ jednaKompanija.lokacija }}</label> <br>
                        <label><b>Kontakt:</b></label> 
                        <label>{{ jednaKompanija.kontakt }}</label> <br>
                        <hr>
                        <label style="text-align: center;"><b>Recenzije:</b></label>
                        <hr>
                        <div v-if="!guestAcc">
                          <label>Vaša ocjena(1-10):</label>
                          <input type="number" min="1" max="10" v-model="ocjenaRecenzije"> <br> <br>
                          <label>Komentar:</label><br>
                          <textarea rows="3" cols="50" v-model="porukaRecenzije"></textarea><br>
                          <button class="btn btn-light btn-outline-primary"
                          @click="objaviRecenziju()">Potvrdi</button>
                        </div>
                        <hr>
                        <span v-for="r in recenzije">
                            <label><b>Korisnik:</b></label>
                            <label>{{ r.ime }} {{ r.prezime }}</label> <br>
                            <label><b>Ocjena:</b></label>
                            <label>{{ r.ocjena }}/10</label> <br>
                            <label><b>Poruka:</b></label>
                            <label>{{ r.poruka}}</label> <br>
                            <hr> 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--KORISNIČKI DIO-->
    <div v-if="prikaziKorisnickiRacun">
      <section class="vh-100" style="background-color: #f4f5f7;">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-6 mb-4 mb-lg-0">
              <div class="card mb-3" style="border-radius: .5rem;">
                <div class="row g-0">
                  <div class="col-md-4 gradient-custom text-center text-white"
                    style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
                    <h5 style="color:black">{{ account.ime }} {{ account.prezime }}</h5>
                    <p style="color:black">{{ account.username }}</p>
                    <i class="far fa-edit mb-5"></i>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body p-4">
                      <h6>Information</h6>
                      <hr class="mt-0 mb-4">
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Email</h6>
                          <p class="text-muted">{{account.email}}</p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Phone</h6>
                          <p class="text-muted">{{account.brojTelefona}}</p>
                        </div>
                      </div>
                      <h6>Historija rezervacija</h6>
                      <hr class="mt-0 mb-4">
                      <div class="row pt-1">
                        <table class="table table-stripped justify-content-center">
                            <thead>
                                <tr>
                                  <th>Rezervacije</th>
                                  <th>Datum od</th>
                                  <th>Datum do</th>
                                  <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="r in rezervacijeKorisnika" v-if="r.idkorisnika == account.idkorisnika">
                                  <td>{{ r.model }}</td>
                                  <td>{{ r.datumOd.slice(0,10)}} </td>
                                  <td>{{ r.datumDo.slice(0,10)}} </td>
                                  <td>
                                      <button type="button" class="btn btn-light mr-1"
                                      data-bs-toggle="modal" data-bs-target="#modalRezervacije" @click="infoRezervacije(r)">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                          </svg>
                                      </button>
                                  </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="modal fade" id="modalRezervacije" tabindex="-1" aria-labelledby="kursModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{jednaRezervacija.model}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="close"></button>
                    </div>
                    <div class="modal-body">
                        <label style="text-align: center;"><b>Informacije o rezervaciji:</b></label>
                        <hr>
                        <label><b>Datum od:</b></label>
                        <label>{{ jednaRezervacija.datumOd }}</label> <br>
                        <label><b>Datum do:</b></label> 
                        <label>{{ jednaRezervacija.datumDo }}</label> <br>
                        <label><b>Cijena usluge (BAM/dan):</b></label> 
                        <label>{{ jednaRezervacija.cijenaUsluge }}</label> <br>
                        <hr>
                        <label style="text-align: center;"><b>Detalji:</b></label>
                        <hr>
                        <label><b>Dodatna usluga:</b></label>
                        <label>{{ jednaRezervacija.nazivDodatneUsluge }}</label> <br>
                        <label><b>Cijena dodatne usluge (BAM/dan):</b></label>
                        <label>{{ jednaRezervacija.cijenaDodatneUsluge }}</label> <br>
                        <hr>
                        <label><b>Ukupna cijena rezervacije:</b></label>
                        <label>{{ (jednaRezervacija.cijenaUsluge + jednaRezervacija.cijenaDodatneUsluge)*daniRezervacije}} BAM</label> <br>
                        <hr> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return { 
      //KORISNICI VARIJABLE
      korisnici: [],
      account:[],
      uspjesanLogin: false,
      guestAcc: false,
      username:"",
      password:"",
      testPassword:"",
      testUsername:"",
      prikaziKorisnickiRacun:false,
      rezervacijeKorisnika:[],
      jednaRezervacija:[],
      danOdRezervacije:0,
      danDoRezervacije:0,
      daniRezervacije:0,
      //USLUGE VARIJABLE
      usluge:[],
      jednaUsluga:[],
      prikazUsluga: false,
      randomBrojZaIdRezervacije:0,
      prikazZaNovuRezervaciju: false,
      IdDodatneUslugeNoveRezervacije:0,
      sveDodatneUsluge:[],
      datumOdNovaRez:0,
      datumDoNovaRez:0,
      //KOMPANIJE VARIJABLE
      kompanije:[],
      jednaKompanija:[],
      recenzije:[],
      sveRecenzije:[],
      prikazKompanija: false,
      ocjenaRecenzije:1,
      porukaRecenzije:"",
      idZadnjeRecenzije:0
    }
  }, 
  methods:{
        created(){
            axios.get(`https://localhost:44333/api/Korisnik/sviKorisnici`)
            .then((res)=>{
                this.korisnici=res.data;
                console.log(this.korisnici);
            });
            axios.get(`https://localhost:44333/api/VwSveOuslugama/sveUsluge`)
            .then((res)=>{
                this.usluge=res.data;
                console.log(this.usluge);
            });
            axios.get(`https://localhost:44333/api/Kompanije/sveKompanije`)
            .then((res)=>{
                this.kompanije=res.data;
                this.kompanije.shift();
                console.log(this.kompanije);
            });
            axios.get(`https://localhost:44333/api/Home/sveUsluge`)
            .then((res)=>{
                this.sveDodatneUsluge=res.data;
                console.log(this.sveDodatneUsluge);
            });
            axios.get(`https://localhost:44333/api/RezervacijeKorisnika/sveRezervacije`)
            .then((res)=>{
                this.rezervacijeKorisnika=res.data;
                console.log(this.rezervacijeKorisnika);
                this.rezervacijeKorisnika.forEach(r=>{
                  r.idkorisnika.replaceAll(" ","");
                })
            });
        },
        //LOGIN METODE
        prijava(){
          this.korisnici.forEach(k => {
            this.testUsername = k.username.replaceAll(" ","");
            this.testPassword = k.password.replaceAll(" ","");
            if(this.testUsername == this.username && this.testPassword == this.password){
              alert(`Uspješan login ${k.ime.replaceAll(" ","")} ${k.prezime.replaceAll(" ","")}.`);
              this.account = k;
              this.account.idkorisnika.replaceAll(" ","");
              this.uspjesanLogin = true;
              this.prikazUsluga = true;
            }
          });
        },
        posjetilacLogin(){
          this.uspjesanLogin = true;
          this.guestAcc = true;
          this.account = "guest";
          this.prikazUsluga = true;
        },
        nazadNaPrijavu(){
          this.uspjesanLogin = false;
          this.guestAcc = false;
          this.account = undefined;
          this.prikazUsluga = false;
          this.prikazKompanija = false;
          this.prikaziKorisnickiRacun = false;
        },
        odjava(){
          this.uspjesanLogin = false;
          this.guestAcc = false;
          this.account = undefined;
          this.prikazUsluga = false;
          this.prikazKompanija = false;
          this.username = "";
          this.password = "";
          this.prikaziKorisnickiRacun = false;
        },
        prikaziAccount(){
          this.prikazKompanija = false;
          this.prikazUsluga = false;
          this.prikaziKorisnickiRacun = true;
          axios.get(`https://localhost:44333/api/RezervacijeKorisnika/sveRezervacije`)
            .then((res)=>{
                this.rezervacijeKorisnika=res.data;
                console.log(this.rezervacijeKorisnika);
                this.rezervacijeKorisnika.forEach(r=>{
                  r.idkorisnika.replaceAll(" ","");
                })
            });
        },
        infoRezervacije(rez){
          this.jednaRezervacija = rez;
          this.danOdRezervacije = new Date(rez.datumOd.slice(0,10));
          this.danDoRezervacije = new Date(rez.datumDo.slice(0,10));
          this.daniRezervacije = (this.danDoRezervacije.getTime() - this.danOdRezervacije.getTime())/ (1000 * 3600 * 24);
        },
        //USLUGE METODE
        infoClick(s){
            this.jednaUsluga=s;
            this.jednaUsluga.datumIstekaRegistracije = this.jednaUsluga.datumIstekaRegistracije.slice(0,10);
        },
        prikaziUsluge(){
          this.prikazKompanija = false;
          this.prikazUsluga = true;
          this.prikaziKorisnickiRacun = false;
        },
        randomBroj(){
          this.randomBrojZaIdRezervacije = Math.floor(Math.random() * (99999 - 10 + 1)) + 10;
        },
        novaRezervacija(){
          this.prikazZaNovuRezervaciju = true;
        },
        upisRezervacije(){
          axios.post('https://localhost:44333/api/VwSveOuslugama/upisRezervacije',{
                idrezervacije: String(this.randomBrojZaIdRezervacije),
                idkorisnika: String(this.account.idkorisnika),
                idusluge: String(this.jednaUsluga.idusluge),
                datumOd: this.datumOdNovaRez,
                datumDo: this.datumDoNovaRez,
                iddodatneUsluge: String(this.IdDodatneUslugeNoveRezervacije)
            })
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
              this.created();
              this.randomBroj();
              this.datumOdNovaRez = 0;
              this.datumDoNovaRez = 0;
              this.IdDodatneUslugeNoveRezervacije = 0;
              this.prikazZaNovuRezervaciju = false;
        },
        //KOMPANIJE METODE
        prikazRecenzijaZaKompaniju(k){
            this.jednaKompanija=k;
            axios.get(`https://localhost:44333/api/Kompanije/sveRecenzije?id=`+k.idkompanije)
            .then((res)=>{
                this.recenzije=res.data;
                console.log(this.recenzije);
            });
        },
        prikaziKompanije(){
          this.prikazKompanija = true;
          this.prikazUsluga = false;
          this.prikaziKorisnickiRacun = false;
        },
        objaviRecenziju(){
          axios.post('https://localhost:44333/api/Recenzije/upisRecenzije',{
                idkorisnika: String(this.account.idkorisnika),
                idkompanije: String(this.jednaKompanija.idkompanije),
                ocjena: String(this.ocjenaRecenzije),
                poruka: String(this.porukaRecenzije)
            })
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
              this.created();
              this.porukaRecenzije = "";
              this.ocjenaRecenzije = 1;
              this.prikazRecenzijaZaKompaniju(this.jednaKompanija);
        }
    },
    //POKRETANJE METODE
    mounted:function(){
        this.created();
        this.randomBroj();
            console.log(this.randomBrojZaIdRezervacije);
    }
}
</script>
<style>
  .rounded-t-5 {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  @media (min-width: 992px) {
    .rounded-tr-lg-0 {
      border-top-right-radius: 0;
    }

    .rounded-bl-lg-5 {
      border-bottom-left-radius: 0.5rem;
    }
  }
</style>