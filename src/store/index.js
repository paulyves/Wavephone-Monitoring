import Vue from 'vue';
import Vuex from 'vuex';
import Registered from './modules/registered';
import ChartsData from './modules/chartsdata';

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        Registered,
        ChartsData
    }
})