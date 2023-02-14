<template>
    <v-app id="inspire">
        <v-app-bar app color="indigo" class="pa-0" :elevation="5">
            <v-col class="d-flex justify-space-around">
                <h1>IntelliQ</h1>
            </v-col>
        </v-app-bar>



        <v-container class="text-center">
            <v-row class="my-5">
                <v-col
                        v-for="survey in surveys"
                >
                    <v-card >
                        <v-card-title class="title font-weight-bold">
                            <v-btn :to="`/usersurveys/${survey.id}`">{{ survey.name }}</v-btn>

                        </v-card-title>


                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </v-app>
</template>

<script>
import {options} from "axios";
import postService from '../postservice';
import {id} from "vuetify/locale";

export default {
    name: "UserSurveys",
    data() {
        return {
            surveys:[]

        };
    },
    async created() {
        try {
            this.surveys= await postService.getsurveys();

        } catch (error) {
            console.error(error);
        }
    },
};
</script>
