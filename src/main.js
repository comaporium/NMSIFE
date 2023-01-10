import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import kompanije from './Kompanije.vue';
import Pocetna from './Pocetna.vue';


Vue.use(VueRouter);

const routes = [
    {path: '/kompanije', component: kompanije},
    {path: '/', component: Pocetna}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
