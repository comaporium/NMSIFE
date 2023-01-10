<template>
    <div>
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
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      kompanije:[],
      jednaKompanija:[],
      recenzije:[]
    }
  },
  methods:{
    created(){
            axios.get(`https://localhost:44333/api/Kompanije/sveKompanije`)
            .then((res)=>{
                this.kompanije=res.data;
                this.kompanije.shift();
                console.log(this.kompanije);
            });
            axios.get(`https://localhost:44379/api/Kurs/sviKursevi`)
            .then((res)=>{
                this.Kursevi=res.data;
                console.log(this.students);
            });
            axios.get(`https://localhost:44379/api/Kurs/sviUcesniciKurseva`)
            .then((res)=>{
                this.StudentiNaKursu=res.data;
                console.log(this.students);
            });
        },
        prikazRecenzijaZaKompaniju(k){
            this.jednaKompanija=k;
            axios.get(`https://localhost:44333/api/Kompanije/sveRecenzije?id=`+k.idkompanije)
            .then((res)=>{
                this.recenzije=res.data;
                console.log(this.recenzije);
            });
        },
        addKurs(){
            this.kursId=0;
            this.modalNaslov = "Kreiranje novog kursa";
            this.nazivKursa = "";
        },
        dodajStudentaNaListu(sk){
            this.NoviStudentiNaKursu.push({
                studentId: sk.studentId,
                ime: sk.ime,
                prezime: sk.prezime,
                godina: sk.godina,
                statusId: sk.statusId
            });
            let index = this.NoviStudentiKojiNisuNaKursu.findIndex(object => {
                return object.studentId === sk.studentId;
            });
            this.NoviStudentiKojiNisuNaKursu.splice(index,1);
        },
        skiniStudentaSaListe(sk){
            this.NoviStudentiKojiNisuNaKursu.push({
                studentId: sk.studentId,
                ime: sk.ime,
                prezime: sk.prezime,
                godina: sk.godina,
                statusId: sk.statusId
            });
            const index = this.NoviStudentiNaKursu.findIndex(object => {
                return object.studentId === sk.studentId;
            });
            this.NoviStudentiNaKursu.splice(index,1);
        },
        kreirajKursSaStudentima(){
            axios.get(`https://localhost:44379/api/Kurs/sviKursevi`)
            .then((res)=>{
                this.Kursevi=res.data;
                console.log(this.students);
            });  
            axios.post('https://localhost:44379/api/Kurs/dodajKurs', {
                nazivKursa: this.nazivKursa
            })
            .then(response => console.log(response))
            .catch(error => {
                console.error('There was an error!', error);
            });
            this.zadnjiKursId = this.Kursevi.length + 1;
            this.NoviStudentiNaKursu.forEach((obj, index)=>{
                axios.post('https://localhost:44379/api/Kurs/upisStudentaNaKurs', {
                studentId: obj.studentId,
                kursId: this.zadnjiKursId
                })
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            });
            window.location.reload(); 
        },
    },
    mounted:function(){
        this.created();
    }        
}
</script>