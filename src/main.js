import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'
import router from './routes'

import VueCookies from 'vue3-cookies'
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueZoomer from 'vue-zoomer'
import VueEasyLightbox from 'vue-easy-lightbox'


import VCalendar from 'v-calendar';

//ui 설정
window.Kakao.init('83596c76e04bc391ea007eff354d1d23');


const app = createApp(App);
app.use(VCalendar);

app.use(VueEasyLightbox)
app.use(ElementPlus)
app.use(VueZoomer)
app.use(CKEditor).mount();
app.use(router);
app.mount('#app');

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAk3JtD4rmjVoNiVZHGcUTIs5-xU6FrbT4',
        libraries: "places"
    },
})
app.use(VueCookies, {
    expireTimes: "7d",
});



// 설치한 모듈 
// ==> vue router (npm install vue-router@next --save),
// ==> axios (npm install axios--save),
// ==> vuezoomer (npm install vue-zoomer@next)