<template>
    <v-app id="inspire">
        <v-app-bar app color=" bg-indigo-accent-3 " class="pa-0" :elevation="5">
            <v-col class="d-flex justify-space-around">
                <h1>IntelliQ</h1>
            </v-col>
        </v-app-bar>

        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" dense>
                <v-col cols="12" sm="8" md="4" lg="4">
                    <v-card
                            class="mx-auto"
                            max-width="500"
                    >
                        <v-card-item class="bg-indigo-lighten-5">
                            <v-card-title class="align-center">
                                    <span class="text-h4">
                                        <p class="text-center">
                                             Login
                                        </p>

                                    </span>
                            </v-card-title>
                        </v-card-item>
                        <v-card-item class="bg-indigo-lighten-5">
                            <v-select
                                    v-model="selectedValue"
                                    v-bind:items="items"
                                    label="Select a role"
                            ></v-select>
                        </v-card-item>

                        <v-card-item v-if="selectedValue === 'Admin'" class="bg-indigo-lighten-5" >
                            <v-select
                                    :items="admins"
                                    label="Select an admin"
                            ></v-select>
                        </v-card-item>
                        <v-card-item v-if="selectedValue === 'Institution'" class="bg-indigo-lighten-5" >
                            <v-select
                                    :items="institutions"
                                    label="Select an Institution "
                            ></v-select>
                        </v-card-item>
                        <v-card-item v-if=" selectedValue !== ''">
                            <v-btn
                                    v-if=" selectedValue !== ''"
                                    x-large
                                    block
                                    rounded

                                    @click="login"
                                    class="bg-indigo-lighten-1">
                                Submit
                            </v-btn>
                        </v-card-item>

                    </v-card>
                </v-col>
            </v-row>

        </v-container>


    </v-app>
</template>

<script>
import {options} from "axios";
import requests from '../requests';
export const BASE_URL = 'http://localhost:9103/intelliq_api' ;


export default {
    name: "loginPage",
    data: () => ({
        items: ['User', 'Admin', 'Institution'],
        admins: [],
        institutions: [],
        selectedValue: '',
        reveal: false,

    }),
    async created() {
        try{
            this.admins = await requests.get(BASE_URL + '/adminPage/');
            this.institutions = await requests.get(BASE_URL +'/institution/');
        }catch (error) {
            reject(error);
        }
    },
    methods: {
        login() {
            if (this.selectedValue === 'User') {
                var loginUserObj = {
                    name: ''
                }
                requests.post(BASE_URL +'/user/postUser/', loginUserObj, this.loginCallBackUser);
            }
        },


        loginCallBackUser(response) {
            this.$router.push({path: '/homePageUser'});
            console.log(response);
        }
    }
}


</script>

<style scoped>

</style>