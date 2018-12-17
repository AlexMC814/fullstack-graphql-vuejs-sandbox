import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify, {
  iconfont: 'fa',
  lang: {
    locales: { ru },
    current: 'ru'
  },
  theme: {
    primary: '#26A69A',
    secondary: '#80CBC4',
    accent: '#EF5350',
    error: '#D50000',
    warning: '#FFC107',
    info: '#2979FF',
    success: '#1B5E20'
  }
});
