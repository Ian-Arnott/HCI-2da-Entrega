import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#44692b',
                secondary: '#b0bec5',
                accent: '#C3F1A1', // #8c9eff
                error: '#b71c1c',
                info: '#2196F3',
                success: '#44692b', // 4CAF50
                warning: '#57614E',
                snackbarDefault: '#333333',
            },
        },
    },
});
