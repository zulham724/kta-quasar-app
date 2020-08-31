<template>
<q-layout view="hHr lpR fFr">
    <q-page-container>
        <!-- <keep-alive> -->
        <router-view />
        <!-- </keep-alive> -->
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
        <q-tabs dense class="bg-grey" v-if="MusicPlayer.item">
            <div class="row full-width">
                <div class="col-2">
                    <div class="row align-center justify-center">
                        <q-btn :icon="MusicPlayer.isPlay ? 'pause' : 'play_arrow'" flat round color="white" @click="MusicPlayer.isPlay ? pause() : resume()" />
                    </div>
                </div>
                <div class="col-6 self-center text-center">
                    <div class="caption text-white">{{ MusicPlayer.item.name }}</div>
                </div>
                <div class="col-2">
                    <div class="row align-center justify-center">
                        <q-btn icon="favorite" flat round color="white" @click="$q.notify('Dalam kontruksi')" />
                    </div>
                </div>
                <div class="col-2">
                    <div class="row align-center justify-center">
                        <q-btn icon="close" flat round color="white" @click="close()" />
                    </div>
                </div>
                <div class="col-12">
                    <q-linear-progress :value="((this.MusicPlayer.item.audio.currentTime/this.MusicPlayer.item.audio.duration*100)/100)" color="teal" />
                </div>
            </div>
        </q-tabs>
        <q-tabs v-model="tab" no-caps stretch class="text-grey" active-color="teal" indicator-color="transparent" align="justify">
            <q-tab name="home" icon="home" @click="$route.name == 'home' ? null : $router.push('/')" />
            <q-tab name="event" icon="event" @click="$route.name == 'event' ? null : $router.push('/event')" />
            <q-tab name="feature" icon="apps" @click="$route.name == 'feature' ? null : $router.push('/feature')" />
            <q-tab name="account" @click="$route.name == 'account' ? null : $router.push('/account')" v-if="Auth.auth">
                <template v-slot:default>
                    <div>
                        <q-avatar size="sm">
                            <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
                        </q-avatar>
                    </div>
                </template>
            </q-tab>
        </q-tabs>
    </q-footer>

    <!--<q-dialog v-model="isSurvey" v-if="Questionnary.items.length>0">
        <q-card v-if="!isStartSurvey">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">{{Questionnary.items[0].name}}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section v-if="!isStartSurvey">
                {{Questionnary.items[0].description}}
            </q-card-section>
            <q-card-actions align="right">
                <q-btn no-caps flat color="primary" class="">
                    Jangan Tampilkan Lagi
                </q-btn>
                <q-btn no-caps color="primary" @click="()=>{isStartSurvey=true }" class="q-px-md">
                    Isi Survey
                </q-btn>
            </q-card-actions>
        </q-card>
        <div v-if="isStartSurvey">
            <q-card>
                <q-toolbar>
                    <q-toolbar-title>{{Questionnary.items[0].name}}</q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>
                <questionnary-item-component :data="Questionnary.items[0]"></questionnary-item-component>
                <q-card-actions align="right" class="q-pr-md">
                    <q-btn :loading="loading" no-caps color="primary" class="q-px-md" @click="submitQuestionnary()">
                        Submit
                    </q-btn>
                </q-card-actions>
            </q-card>

        </div>
    </q-dialog>-->

</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
import QuestionnaryComponent from "components/QuestionnaryComponent";

export default {
    name: "MainLayout",
    components: {
        // QuestionnaryItemComponent: () => import("components/questionnaries/ItemComponent.vue")
    },
    data() {
        return {
            //  isSurvey: false,
            // isStartSurvey: false,
            tab: this.$route.name,
            perc: 0.4,
            loading: false,
        };
    },
    computed: {
        ...mapState(["Setting", 'Auth', 'MusicPlayer', 'Questionnary'])
    },
    mounted() {
        setInterval(() => {
            if (this.MusicPlayer.item) {
                this.$forceUpdate()
                if (((this.MusicPlayer.item.audio.currentTime / this.MusicPlayer.item.audio.duration * 100) / 100) >= 1) this.pause();
            }
        }, 500)
        if (this.Setting.isQuestionnary) this.checkQuestionnary();

        // this.$store.dispatch('Questionnary/getActive').then(res => {
        //     if (res.data.length > 0) {
        //         this.isSurvey = true;
        //     }
        // })

    },
    methods: {
        pause() {
            this.$store.commit('MusicPlayer/pause')
        },
        resume() {
            this.$store.commit('MusicPlayer/resume')
        },
        close() {
            this.$store.commit('MusicPlayer/close')
        },
        submitQuestionnary() {
            if (this.Questionnary.items[0].question_lists.find(e => e.answer_id == null)) {
                this.$q.notify('Masih ada kuesioner yang belum diisi');
            } else {
                this.loading = true;
                this.$store.dispatch('Questionnary/submit').then(res => {
                    this.isSurvey = this.isStartSurvey = false;
                    this.$q.notify('Terima kasih telah mengisi kuesioner');
                    this.loading = false
                })
            }

        },
        checkQuestionnary() {
            this.$store
                .dispatch("Questionnary/getActive")
                .then(res => {
                    res.data.forEach(item => {
                        this.$q.dialog({
                                component: QuestionnaryComponent,

                                // optional if you want to have access to
                                // Router, Vuex store, and so on, in your
                                // custom component:
                                parent: this, // becomes child of this Vue node
                                // ("this" points to your Vue component)
                                // (prop was called "root" in < 1.1.0 and
                                // still works, but recommending to switch
                                // to the more appropriate "parent" name)
                                item: item,
                                //store: store
                            })
                            .onOk(() => {
                                console.log("OK");
                            })
                            .onCancel(() => {
                                console.log("Cancel");
                            })
                            .onDismiss(() => {
                                console.log("Called on OK or Cancel");
                            });
                    });
                });
        }
    }
};
</script>
