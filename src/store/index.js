import Vue from 'vue';
import Vuex from 'vuex';
import Registered from './modules/registered';

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        Registered,
    }
})