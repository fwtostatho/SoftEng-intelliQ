<template>
    <v-app id="inspire">
            <v-app-bar app color=" bg-indigo-accent-3 " class="pa-0" :elevation="5">
                <v-col class="d-flex justify-space-around">
                    <h1>IntelliQ</h1>
                </v-col>
            </v-app-bar>
        <div id="app" style="position:absolute; top:55px; left:35px">
            <v-avatar color="indigo" style="position:absolute" size="30px">
                <span class="white--text text-h6">A</span>
            </v-avatar>
            <v-banner
                    single-line="true"
                    class="white--text text-h6"
                    style="top:-9px; left:32px"
                    width="1425px"
                    outlined="false"
            >
                <v-banner-text style="font-size: 22px; font-weight: bold">
                    Welcome Admin!
                </v-banner-text>
                <template v-slot:actions>
                    <v-btn
                            text
                            color="primary"
                            block
                            rounded
                            style="top:-22px"
                            class="bg-blue-accent-1"
                    >
                        Create
                    </v-btn>
                </template>
            </v-banner>
        </div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" dense>
                <v-col cols="12" sm="8" md="4" lg="4">
                    <v-card
                            class="mx-auto"
                            max-width="500"
                            style="top:-175px"
                    >
                        <v-card-item class="bg-indigo-lighten-5">
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
import Popupsurvey from './Popupsurvey'
export default {
    components: { Popupsurvey },
    name: "Admin"
}
</script>

<style scoped>

</style>