<template>
    <v-app id="inspire">
            <v-app-bar app color="indigo" class="pa-0" :elevation="5">
                <v-col class="d-flex justify-space-around">
                    <h1>IntelliQ</h1>
                </v-col>
            </v-app-bar>
        <div id="app" style="position:absolute; top:55px; left:35px">
            <v-container>
            <v-row>
                <v-col class="text-left mr-10"><h2>Welcome {{admin}}</h2></v-col>
                <v-col class="text-right">
                    <v-btn>Create a Survey</v-btn>
                </v-col>
            </v-row>
            </v-container>




        </div>
        <v-container class="fill-height justify-lg-space-around" fluid>
            <v-row align="center" justify="center" dense>
                <v-col cols="12" sm="8" md="4" lg="4">
                    <v-card
                            class="mx-auto"
                            max-width="500"
                            style="top:-175px"
                    >
                        <v-card-item class="bg-indigo-lighten-5 justicy">
                            <v-card-title class="align-center">
                                    <span class="text-h5">
                                        <p class="text-center">
                                             Your Surveys:

                                        </p>
                                    </span>
                            </v-card-title>
                        </v-card-item>
                        <v-card-item class="bg-indigo-lighten-5">
                            <v-btn class="mt-4 mb-3">
                                <Popupsurvey/>
                            </v-btn>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import { options } from "axios";
import router from "../router/index.ts";
import postService from '../postservice';
import Vue from 'vue';

export default {
    async created() {
        try {
            const admin=this.$route.params.selectedValue
            this.admins=await postService.getadmin()
        } catch (error) {
        }
    },
    data () {
        return {
            admin:null,
            admins:[],
            surveys:[]

        }
    },


}
</script>

<style scoped>

</style>