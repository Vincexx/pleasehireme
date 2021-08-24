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
                        @click="snackbar = false"
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
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="getEvent.end_date"
                                @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>

                        <v-btn color="success">Save</v-btn>
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
import Calendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Calendar
    },
    mounted() {
        this.$refs.calendar.scrollToTime("08:00");
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                events: []
            },

            menu: false,
            menu1: false,
            snackbar: false,
            text: ""
        };
    },
    computed: {
        ...mapGetters("calendar", ["getEvent"])
    },

    methods: {}

    // for (let i in this.events) {
    //     this.eventsTo.push({
    //         title: this.events[i].event_name,
    //         date: this.events[i].end_date
    //     });
    // }
};
</script>
