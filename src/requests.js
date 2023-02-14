import axios from 'axios';
const url1 = 'http://localhost:9103/intelliq_api/adminpage/';
const url2 = 'http://localhost:9103/intelliq_api/institution/';





class requests {

    static get(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                const names = data.map(doc => doc.name)
                resolve(names);
            } catch (error) {
                reject(error);
            }
        })
    }

    static post(url, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url, data);
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