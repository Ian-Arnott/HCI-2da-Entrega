import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#44692b"',
                // cambiar colores
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
                //info: '#2196F3',
                //success: '#4CAF50',
                //warning: '#FFC107',
            },
        },
    },
});
