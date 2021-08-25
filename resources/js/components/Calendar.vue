<template>
    <div>
        <v-app>
            <v-snackbar v-model="snackbar">
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="setSnackbarToFalse"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>

            <v-container grid-list-xs class="mt-10 ">
                <v-row class="mx-auto">
                    <v-col md="3">
                        <v-text-field
                            prepend-icon="mdi-map-marker"
                            label="Event Name"
                            clearable
                            v-model="getEvent.name"
                            :error="errors.name ? true : false"
                            :error-messages="errors.name"
                        ></v-text-field>

                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="getEvent.start_date"
                                    label="From"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :error="errors.start_date ? true : false"
                                    :error-messages="errors.start_date"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="getEvent.start_date"
                                @input="menu = false"
                            ></v-date-picker>
                        </v-menu>

                        <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="getEvent.end_date"
                                    label="To"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :error="errors.end_date ? true : false"
                                    :error-messages="errors.end_date"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="getEvent.end_date"
                                @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>

                        <v-btn color="success" @click="saveEvent(getEvent)"
                            >Save</v-btn
                        >
                    </v-col>

                    <v-col md="8">
                        <Calendar :options="calendarOptions" />
                    </v-col>
                </v-row>
            </v-container>
        </v-app>
    </div>
</template>

<script>
// List View of Full Calendar is not working
// import { Calendar } from '@fullcalendar/core';
// import listPlugin from '@fullcalendar/list';

import Calendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
    components: {
        Calendar
    },
    data() {
        return {
            // plugins: [listPlugin],
            // initialView: "listWeek",
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                events: []
            },

            menu: false,
            menu1: false,
            timeout: 2000
        };
    },
    computed: {
        ...mapGetters("calendar", ["getEvent", "getEvents"]),
        ...mapState("calendar", ["snackbar", "text", "errors"]),

        Event: {
            get: function() {
                this.calendarOptions.events = this.getEvents;
                return this.calendarOptions.events;
            },
            set: function(getEvents) {
                this.calendarOptions.events = getEvents;
            }
        }
    },
    mounted() {
        this.calendarOptions.events = this.Event;
    },
    created() {
        this.listEvents();
    },
    methods: {
        ...mapActions("calendar", ["saveEvent", "listEvents"]),
        ...mapMutations("calendar", ["setSnackbarToFalse"])
    }
};
</script>
