import axios from 'axios';
const url1 = 'http://localhost:9103/intelliq_api/adminpage/';
const url2 = 'http://localhost:9103/intelliq_api/institution/';





class requests {

    static get(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                const names=data.map(doc => doc.name);
                resolve(names);
            } catch (error) {
                reject(error);
            }
        })
    }

    static getQuestionnaire(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                const questionnaire= data.map(doc => ({ questionnaireTitle: doc.questionnaireTitle,
                    keywords: doc.keywords,
                    questions: doc.questions,
                    questionnaireID: doc.questionnaireID,
                    creator: doc.creator}));
                resolve(questionnaire[0]);
            } catch (error) {
                reject(error);
            }
        })
    }

    static getAnswers(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                // const questionnaire= data.map(doc => ({ questionnaireTitle: doc.questionnaireTitle,
                //     keywords: doc.keywords,
                //     questions: doc.questions,
                //     questionnaireID: doc.questionnaireID,
                //     creator: doc.creator}));
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    }

    static postSurvey(url, data, config) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url, data, config);
            } catch (error) {
                reject(error);
            }
        })
    }

    static post(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url);
            } catch (error) {
                reject(error);
            }
        })
    }

    static postAnswer(url, questionnaireID, questionID, session, optionID) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url, null, {params: {
                        questionnaireID,
                        questionID,
                        session,
                        optionID
                    }});
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default requests;