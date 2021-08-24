import axios from "axios";
window.Vue = require("vue").default;
// import { Store } from "vuex";

const state = {
    event: {
        name: "",
        start_date: "",
        end_date: ""
    }
};

const getters = {
    getEvent: state => state.event
};

const actions = {};

const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
