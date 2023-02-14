<template>
    <v-app id="inspire">
        <v-app-bar app color="indigo" class="pa-0" :elevation="5">
            <v-col class="d-flex justify-space-around mt-10 mb-10">
                <h1>IntelliQ</h1>
            </v-col>
        </v-app-bar>

        <v-container class="text-center">
            <v-row class="mt-10 mb-10 justify-center">
                <h1>{{ survey.name }}</h1>
            </v-row>


            <v-card class="px-lg-16 mx-16">
                <v-card-title>
                    {{ current.qtext }}
                </v-card-title>
                <v-card-text v-if="current.type==='end'">
                    <v-row class="justify-center">
                        <v-col class="text-center">
                            <v-btn color="primary"
                                   @click="submit"
                                   class="mt-3">
                                Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-text v-if="current.type !=='end'">
                    <v-form ref="form">
                        <v-col class="text-center">

                            <v-radio-group
                                    v-model="selectedOption"
                                    :mandatory="true"
                                    class="mb-3"
                            >

                                <v-radio class="mx-10"
                                         v-for="option in current.options"
                                         :key="option.optID"
                                         :label="option.opttxt"
                                         :value="option.opttxt"
                                ></v-radio>

                            </v-radio-group>
                        </v-col>
                    </v-form>
                </v-card-text>

                <v-card-actions v-if="current.type !='end'">
                    <v-col class="text-blue-grey-lighten-1">
                        <v-btn @click="nextQuestion">Next</v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>

        </v-container>


    </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import {options} from "axios";
import router from "../router/index.ts";
import postService from '../postservice';
import Vue from 'vue';

export const BASE_URL = 'http://localhost:9103/intelliq_api';
import requests from '../requests';

export default {
    async created() {
        try {
            const questionnaireID = this.$route.params.id    // poio id einai
            this.surveys = await postService.getsurveys();
            this.survey = this.surveys.find(survey => survey.id === questionnaireID);   //questionnaire!!!
            this.questions = this.survey.questions;
            this.current = this.questions[0];           // το current question
            this.nextqid = this.questions[0].nextqID;
            this.cOptions = this.current.options;
            this.nextqid = this.cOptions.nextqID;
            this.session = Math.floor(1000 + Math.random() * 9000);
        } catch (error) {
            console.error(error);
        }
    },
    data() {
        return {
            survey: [],
            questions: [],
            current: {},
            selectedOption: '',
            cOptions: [],
            nextqid: [],
            answers: [],
            optionID: '',
            questionID: '',
            session: ''

        };
    },

    methods: {
        nextQuestion() {
            let cOptions = this.current.options;
            let selectedValue = this.selectedOption;
            this.questionID = this.current.qID; //gia to postAnswer prin to allajoume sto for
            for (let i = 0; i < cOptions.length; i++) {
                if (cOptions[i].opttxt === selectedValue) {
                    this.optionID = cOptions[i].optID;    //gia to postAnswer
                    this.nextqid = cOptions[i].nextqID;
                    break;
                }
            }
            for (let i = 0; i < this.questions.length; i++) {
                if (this.questions[i].qID === this.nextqid) {
                    this.current = this.questions[i];
                    break;
                }
            }
            const baseUrl = 'http://localhost:9103/intelliq_api/doanswer/';
            const url = `${baseUrl}${this.survey.id}/${this.questionID}/${this.session}/${this.optionID}`;
            // console.log(this.survey.id);
            // console.log(this.questionID);
            // console.log(this.session);
            // console.log(this.optionID);
            //console.log(url);

            requests.post(url);

            // add the answer to the answers array
            // this.answers.push({ question_id: this.current.qID, answer: selectedValue });
        },
        submit() {
            this.$router.push({path: '/usersurveys'});
        }
    }
}
</script>
