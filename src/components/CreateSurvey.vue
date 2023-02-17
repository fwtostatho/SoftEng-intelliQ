<template>
    <v-app id="inspire">
        <v-app-bar app color="indigo" class="pa-0" :elevation="5">
            <v-col class="d-flex justify-space-around">
                <h1>IntelliQ </h1>
            </v-col>
        </v-app-bar>

        <div class="mt-10 text-center">
            <h1> Create a Survey </h1>
            <div style="max-width: 600px; margin: 0 auto;">
                <v-card class="my-10" color="indigo-lighten-5">
                    <v-text-field class="text-indigo-darken-4"
                                  label="TITLE"
                                  v-model="this.questionnaireTitle"
                                  style="font-weight: bold;"/>

                        <v-text-field class="text-indigo-darken-4"
                                      label="Keyword"
                                      v-model="this.keywords"/>


<!--                    <div class="mb-7">-->
<!--                        <v-btn size="small" color="indigo" @click="addKeyword()"> Add Keyword</v-btn>-->
<!--                    </div>-->
                    <v-text-field class="text-indigo-darken-4"
                                  label="Questionnaire ID"
                                  v-model="this.questionnaireID"/>
                </v-card>
                <v-card class="my-10" color="indigo-lighten-5" v-for="(question, index) in questions" :key="index">
                    <v-text-field label="Question ID" v-model="question.qID" disabled/>

                    <v-select
                            class="text-indigo-darken-4"
                            label="Type"
                            v-model="question.type"
                            :items="['profile', 'question', 'end']"
                    />
                    <template v-if="question.type!=='end'">

                        <v-text-field label="Question" class="text-light-blue-darken-4" v-model="question.qtext"/>
                        <div v-for="(answer, index2) in question.options" :key="index2">
                            <v-text-field class="text-indigo-darken-4" label="Answer" v-model="answer.opttxt"/>
                            <v-select
                                    class="text-indigo-darken-4"
                                    label="Next Question ID"
                                    v-model="answer.nextqID"
                                    :items="questionIDs"
                            />

                        </div>
                        <div class="my-3">
                            <v-btn @click="addAnswer(index)" class="bg-indigo-darken-4">
                                <v-icon>mdi-plus</v-icon>
                                Add Answer
                            </v-btn>
                        </div>

                        <div class="mb-8">
                            <v-btn @click="deleteAnswer(index, answerIndex)" class="bg-red-darken-4">
                                <v-icon>mdi-delete</v-icon>
                                Delete Answer
                            </v-btn>
                        </div>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>

                        <div class="mb-3">
                            <v-btn @click="addQuestion" class="bg-indigo-darken-4">
                                <v-icon>mdi-plus</v-icon>
                                Next Question
                            </v-btn>
                        </div>
                        <div class="mb-4">
                            <v-btn @click="deleteQuestion(currentQuestionIndex)" class="bg-red-darken-4">
                                <v-icon>mdi-delete</v-icon>
                                Delete Question
                            </v-btn>
                        </div>
                        <div class="ml-4 text-left">
                            <p>Is this question required?</p>
                            <v-switch v-model="question.required" color="success" label="Turn on/off"></v-switch>
                        </div>
                    </template>
                    <template v-else>
                        <v-text-field label="End message" v-model="question.qtext"/>
                        <v-btn color="indigo" @click="Submit()">Submit</v-btn>
                    </template>

                </v-card>
            </div>



        </div>
    </v-app>
</template>

<script>
import postService from '../postservice';
import request from '../requests.js';

export default {
    data() {
        return {
            admins: [],
            adminid: '',
            adminName: '',
            endmessage: '',
            answerIndex: '',
            currentQuestionIndex: 0,
            questionnaireTitle: '',
            questionnaireID: '',
            keywords: [""],
            creatorID: '',
            admin: '',
            questions: [
                {
                    qID: 'Q000',
                    qtext: '',
                    type: '',
                    required: false,
                    options: [
                        {
                            optID: 'A1',
                            opttxt: '',
                            nextqID: '-'
                        }
                    ],
                },
            ],
            showAddBtn: true,
        };
    },
    computed: {
        questionIDs() {
            return this.questions.map((question) => question.qID);
        },
    },
    methods: {
        addQuestion() {
            const lastQuestion = this.questions[this.questions.length - 1];
            const newQuestionID = `Q0${String(Number(lastQuestion.qID.slice(2)) + 1).padStart(2, '0')}`;
            const optionsCopy = [...lastQuestion.options];
            this.currentQuestionIndex++;
            this.questions.push({
                qID: newQuestionID,
                qtext: '',
                type: '',
                required: false,
                options: [
                    {
                        optID: 'A1',
                        opttxt: '',
                        nextqID: '-',

                    }
                ],
            });
        },
        // addKeyword() {
        //     this.keywords.push('');
        // },

        addAnswer(index) {
            this.answerIndex = index;
            this.questions[index].options.push({
                optID: `A${this.questions[index].options.length + 1}`,
                opttxt: '',
                nextqID: '-'
            });
        },
        deleteAnswer(questionIndex, answerIndex) {
            this.questions[questionIndex].options.splice(answerIndex, 1);
        },
        deleteQuestion(questionIndex) {
            this.questions.splice(questionIndex, 1);
        },

        changeQuestionType(question) {
            this.showAddBtn = question.type !== 'end';
        },
        Submit() {
            // console.log(this.questions);
            // console.log(this.questionnaireID);
            // console.log(this.questionnaireTitle);
            // console.log(this.keywords);
            const toSend = {
                questionnaireTitle: this.questionnaireTitle,
                questionnaireID: this.questionnaireID,
                keywords: this.keywords,
                questions: this.questions,
                creator: this.adminid,
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const jsonString = JSON.stringify(toSend);
            console.log(jsonString);

            const url = 'http://localhost:9103/intelliq_api/questionnaire/postQuestionnaire';

            request.postSurvey(url, jsonString, config);

            this.$router.push({path: '/admin/' + this.adminName})
        }
    },
    async created() {
        this.adminid = this.$route.params.adminID;
        this.admins= await postService.getadmin();
        this.adminName = this.admins.find(admin => admin.id === this.adminid).name;
        this.questions.forEach((question) => {
            this.$watch(
                    () => question.type,
                    () => this.changeQuestionType(question)
            );
        });
    },
};
</script>