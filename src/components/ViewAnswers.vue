<template>
    <v-app id="inspire">
        <v-app-bar app color="indigo" class="pa-0" :elevation="5">
            <v-col class="d-flex justify-space-around">
                <h1>IntelliQ</h1>
            </v-col>
        </v-app-bar>


        <h1 class="text-center mt-10">{{ questionnaire.questionnaireTitle }}</h1>
        <v-container>
            <v-row>
                <v-col v-for="(question, index) in questionnaire.questions" :key="question.qID" cols="12">
                    <h2>{{ question.qtext }}</h2>
                    <v-list>
                        <v-list-item v-for="answer in answers[index]" :key="answer.optID">
                            <v-list-item-title> Session {{answer.session}}: {{ matchAnswer(answer.ans, question) }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import requests from '../requests';

export default {
    name: "ViewAnswers.vue",
    data() {
        return {
            surveyID: "",
            questionTitle: [],
            answers: [],
            questionnaire: [],
            ans: [],
        };
    },
    async created() {
        try {
            this.surveyID = this.$route.params.questionnaireID;
            const baseUrl = 'http://localhost:9103/intelliq_api/questionnaire/';
            const url = `${baseUrl}${this.surveyID}`;
            this.questionnaire = await requests.getQuestionnaire(url);
            for (let i = 0; i < this.questionnaire.questions.length; i++) {
                this.questionTitle.push(this.questionnaire.questions[i].qtext);
                const baseUrl2 = 'http://localhost:9103/intelliq_api/getquestionanswers/';
                const url2 = `${baseUrl2}${this.surveyID}/${this.questionnaire.questions[i].qID}`;
                const answers = await requests.getAnswers(url2);
                this.answers.push(answers.answer);

            }
            console.log(this.answers);
            console.log(this.questionTitle);

        } catch (error) {
            console.error(error);
        }

    },
    methods: {
        matchAnswer(ans, question) {
            for (let i = 0; i < question.options.length; i++) {
                if (ans === question.options[i].optID) {
                    return question.options[i].opttxt;
                }
            }


        }
    }

}
</script>

<style scoped>

</style>