<template>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      edit:false,
      isReadOnly:true,
      korisnici: [],
      usluge:[],
      jednaUsluga:[],
      statusStudenata:[],
      modalNaslov:"",
      studentId:0,
      brojIndexa:1,
      ime:"",
      prezime:"",
      godina:1,
      statusId:1,
      statusStudenta:null
    }
  },
  methods:{
        created(){
            axios.get(`https://localhost:44333/api/Korisnik/sviKorisnici`)
            .then((res)=>{
                this.korisnici=res.data;
                console.log(this.korisnici);
                console.log(this.test);
            });
            axios.get(`https://localhost:44333/api/VwSveOuslugama/sveUsluge`)
            .then((res)=>{
                this.usluge=res.data;
                console.log(this.usluge);
            });
        },
        addClick(){
            this.modalNaslov="Add student";
            this.studentId=0;
            this.brojIndexa=1;
            this.ime="";
            this.prezime="";
            this.godina=1;
            this.statusId=1;
            this.isReadOnly=false;
        },
        editClick(s){
            this.modalNaslov="Edit student";
            console.log(s);
            this.studentId=s.studentId;
            this.brojIndexa=s.brojIndexa;
            this.ime=s.ime;
            this.prezime=s.prezime;
            this.godina=s.godina;
            this.statusId=s.statusId;
            this.isReadOnly=false;
            this.edit=true;
        },
        infoClick(s){
            this.jednaUsluga=s;
            this.jednaUsluga.datumIstekaRegistracije = this.jednaUsluga.datumIstekaRegistracije.slice(0,10);
        },
        updateStudenta(){
            axios.post('https://localhost:44379/api/Students/updateStudenta?id='+ this.studentId +'&brojindexa='+this.brojIndexa+'&ime='+this.ime+'&prezime='+this.prezime+'&godina='+this.godina+'&statusid='+this.statusId)
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            window.location.reload();
        },
        kreirajStudenta(){
            axios.post('https://localhost:44379/api/Students/upisStudenta', {
                brojIndexa: parseInt(this.brojIndexa),
                ime: this.ime,
                prezime: this.prezime,
                godina: parseInt(this.godina),
                statusId: parseInt(this.statusId)
            })
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            window.location.reload();  
        },
        deleteClick(id){
        if(confirm("Do you want to delete a student under ID " + id +"?")){
            axios.delete("https://localhost:44379/api/Students/obrisiStudenta/"+id)
            .then(response=>console.log(response))
            .catch(error=>console.log(error))
            window.location.reload();
        }
         else 
          alert("Student under ID " + id +" not deleted.")
      },
    },
    mounted:function(){
        this.created();
    }
  }
</script>