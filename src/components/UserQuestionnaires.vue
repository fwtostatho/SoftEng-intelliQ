<template>
    <v-app id="inspire">
        <v-app-bar app color="indigo" class="pa-0" :elevation="5">
            <v-col class="d-flex justify-space-around">
                <h1>IntelliQ</h1>
            </v-col>
        </v-app-bar>



        <v-container class="text-center">
            <v-row class="my-5 justify-center" v-for="survey in surveys">

                    <v-card >
                        <v-list-item-content>
                    <v-btn @click="goToSurvey(survey.id)">{{ survey.name }} </v-btn>
                        </v-list-item-content>


                    </v-card>

            </v-row>
        </v-container>

    </v-app>
</template>

<script>

import postService from '../postservice';


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


methods: {
    // ...mapActions([]),
            goToSurvey(id) {
                this.$router.push({ name: 'AnswerSurvey', params: { id } });
            },
        },
    // computed: {
    //     ...mapGetters([])
    // }
    };
</script>
