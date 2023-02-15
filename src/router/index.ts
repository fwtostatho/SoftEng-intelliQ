// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../components/LoginPage.vue'
import Postuser from '../components/Postuser.vue'
import UserSurveys from '../components/UserQuestionnaires.vue'
import Admin from '../components/Admin.vue'
import PostUser from '../components/Postuser.vue'
import Questionnarie from '../components/UploadQuestionnarie.vue'
import AnswerSurvey from '../components/AnswerSurvey.vue'
import CreateSurvey from '../components/CreateSurvey.vue'
import ViewAnswers from "../components/ViewAnswers.vue"
import App from '../components/App.vue'

// @ts-ignore
// @ts-ignore
// @ts-ignore
const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/questionnaire_upd',
        name: 'uploadQuestionnarie',
        component: Questionnarie
    },
    {
        path: '/adduser',
        name: 'Add',
        component: Postuser
    },
    {
        path: '/admin/:admin',
        name: 'Admin',
        component: Admin
    },

    {   path: '/admin/answeredSurvey/:questionnaireID',
        name: 'ViewAnswers',
        component: ViewAnswers
    },

    {
        path: '/usersurveys',
        name: 'UserSurveys',
        component: UserSurveys
    },

    {
        path: '/homePageUser',
        name: 'Postuser',
        component: PostUser
    },
    {
        path: '/usersurveys/:id',
        name: 'AnswerSurvey',
        component: AnswerSurvey
    },
    {
        path: '/createsurvey/:admin',
        name: 'CreateSurvey',
        component: CreateSurvey
    },

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    //import.meta
    routes
})

export default router


// import Vue from  "vue";
// import Router from "vue-router";
// import Login from "../LoginPage.vue";
//
// Vue.use(Router);
//
// export default new Router({
//     routes:[
//         {path: '', component: Login},
//
//     ]
// });