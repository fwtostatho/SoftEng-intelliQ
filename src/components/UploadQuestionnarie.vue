<template>
    <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
        <input type="file" ref="fileInput"/>
        <button type="submit">Submit</button>
    </form>
</template>

<script>

import requests from '../requests';
export const BASE_URL = 'http://localhost:9103/intelliq_api' ;
export default {
    name: "UploadQuestionnarie.vue",
    methods: {
        submitForm() {
            const input = this.$refs.fileInput
            const file = input.files[0]

            // Use axios to send the file in a multipart/form-data request
            axios.post(BASE_URL+ 'admin/questionnaire_upd', file);
        }
    }
}
</script>

<style scoped>

</style>