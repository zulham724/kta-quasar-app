<template>
<div>
    <q-pull-to-refresh @refresh="init" color="teal">

        <q-header elevated>
            <q-toolbar class="bg-white">
                <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
                <q-toolbar-title>
                    <div class="text-body2 text-teal text-bold">Dokumen</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page>
            <div class="q-pt-sm">
                <div v-if="loading && !userDocuments" style="width:100%">
                    <q-card flat bordered class="q-ma-sm" v-for="n in 3" :key="`loading-${n}`">

                        <q-skeleton height="10vh" square animation="fade" />

                    </q-card>
                </div>
                <div v-if="userDocuments">
                    <q-infinite-scroll @load="onLoad" :offset="250">

                        <q-list>
                            <div v-for="(document, n) in userDocuments.documents.data" :key="n" style="min-height:10vh">
                                <q-item>
                                    <q-item-section>
                                        <q-input filled :value="document.name" readonly @click.self="$router.push('/post/comment/'+document.fileable.id)">
                                            <template v-slot:prepend>
                                                <q-icon name="note" @click.stop="$router.push('/post/comment/'+document.fileable.id)" />
                                            </template>

                                            <template v-slot:append>
                                                <q-icon name="vertical_align_bottom" @click.stop="downloadFile(document.id)" class="cursor-pointer" />
                                            </template>

                                        </q-input>
                                    </q-item-section>
                                </q-item>
                                <q-separator spaced inset />
                            </div>
                        </q-list>
                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-dots color="primary" size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>

                </div>
            </div>

        </q-page>
    </q-pull-to-refresh>

</div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    props: {
        userId: null,
        postId: null
    },
    // components: {
    //     ItemComponent: () => import("components/post/ItemComponent.vue")
    // },
    computed: {
        ...mapState(["Setting", "Auth", "UserDocument"]),
        userDocuments: function () {
            const index = this.UserDocument.items.findIndex(e => e.user.id == this.userId);
            if (index > -1) {
                return this.UserDocument.items[index];
            } else return null;
        }
    },
    created() {
        //console.log(this.UserDocument)
        const index = this.UserDocument.items.findIndex(e => e.user.id == this.userId);
        if (index == -1) {
            this.loading = true;
            this.$store.dispatch("UserDocument/index", this.userId).then(res => {
                this.loading = false;
            })
        }

    },
    data() {
        return {
            user: null,
            loading: false
        };
    },
    methods: {
        init(done) {
            return new Promise((resolve, reject) => {
                this.loading = true;
                this.$store
                    .dispatch("UserDocument/index", this.userId)
                    .then(res => {
                        resolve(res);
                        if (done) done();
                    })
                    .catch(err => {
                        reject(err);
                    }).finally(() => {
                        this.loading = false;
                    });
            });
        },
        onLoad(index, done) {
            let next_page_url;
            if (this.userDocuments && (next_page_url = this.userDocuments.documents.next_page_url)) {
                this.$store.dispatch("UserDocument/next", {
                    next_page_url: next_page_url
                }).then(() => {
                    done();
                });
            } else {
                done();
            }

        },
        onLogout() {
            this.$router.push("/login").then(() => {
                this.$store.dispatch("Auth/logout");
            });
        },
        downloadFile(document_id) {

            const find = this.userDocuments.documents.data.find(e => e.id == document_id);
            if (find) {
                console.log(this.Setting.storageUrl + '/' + find.src);
                cordova.InAppBrowser.open(`${this.Setting.storageUrl}/${find.src}`, "_system", "location=no");
            } else {
                this.$q.notify('Download not available');
            }
        }
    },
};
</script>

<style></style>
