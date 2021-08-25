import axios from "axios";
import { merge } from "jquery";
window.Vue = require("vue").default;
// import { Store } from "vuex";

const state = {
    event: {
        name: "",
        start_date: "",
        end_date: ""
    },
    snackbar: "",
    text: "",
    events: [],
    tempEvents: [],
    errors: []
};

const getters = {
    getEvent: state => state.event,
    getEvents: state => state.events
};

const actions = {
    async saveEvent({ commit, dispatch }, data) {
        await axios
            .post("/api/events", data)
            .then(response => {
                dispatch("listEvents");
                commit("setSnackbar", true);
                commit("clearErrors");
                commit("clearEvent");
                commit("setText", response.data.message);
            })
            .catch(error => {
                console.log(error);
                commit("setErrors", error.response.data.errors);
            });
    },

    async listEvents({ commit, dispatch }, data) {
        await axios
            .get("/api/events")
            .then(response => {
                commit("setTempEvents", response.data);
                commit("setEvents");
            })
            .catch(error => console.log(error));
    }
};

const mutations = {
    setErrors(state, payload) {
        return (state.errors = payload);
    },
    clearErrors() {
        return (state.errors = []);
    },
    setSnackbar(state, payload) {
        return (state.snackbar = payload);
    },
    setSnackbarToFalse(state) {
        return (state.snackbar = false);
    },
    setText(state, payload) {
        return (state.text = payload);
    },
    setTempEvents(state, payload) {
        return (state.tempEvents = payload);
    },
    setEvents(state) {
        let eventsFrom = [],
            eventsTo = [];
        for (let i in state.tempEvents) {
            eventsFrom.push({
                title: state.tempEvents[i].name,
                date: state.tempEvents[i].start_date
            });

            eventsTo.push({
                title: state.tempEvents[i].name,
                date: state.tempEvents[i].end_date
            });
        }

        return (state.events = merge(eventsFrom, eventsTo));
    },
    clearEvent(state) {
        return (state.event = {
            name: "",
            start_date: "",
            end_date: ""
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
