import Vue from 'vue';
import Vuex from 'vuex';
import Registered from './modules/registered';
import ChartsData from './modules/chartsdata';
import Data from './modules/data';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        Registered,
        ChartsData,
        Data
    }
})