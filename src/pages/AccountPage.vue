<template>
<q-layout view="hHh Lpr lff">

    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-icon name="person_outline" color="teal" size="sm" />
            <q-toolbar-title>
                <!-- <div class="row q-pa-2">
                    <div class="text-body2 text-teal text-bold">{{ Auth.auth.name }}</div>
                </div> -->
                  <div class="col">
                    <div class="text-body2 text-teal text-bold">{{ Auth.auth.name }}</div>

                    <div class="text-caption">
                          <appreciation-badge-component :items="Auth.auth.appreciations"></appreciation-badge-component>
                        </div>
                    </div>
            </q-toolbar-title>
            <q-btn flat dense icon="more_vert" color="teal" @click="drawer = true" />
        </q-toolbar>
    </q-header>

    <q-page-container>
        <q-page>
            <q-pull-to-refresh @refresh="getAuth" color="teal">
                <div class="q-pa-md">
                    <div class="row">
                        <div class="col-3">
                            <div class="row justify-start align-center">
                                <q-avatar size="80px" @click="zoom(Auth.auth.avatar)">
                                    <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                                </q-avatar>
                            </div>
                        </div>
                        <div class="col-3 self-center">
                            <div class="row justify-center">
                                <div class="text-body1 text-bold">
                                    {{ Auth.auth.posts.filter(item => item.files.length && item.files[0].value!='document').length }}
                                </div>
                            </div>
                            <div class="row justify-center">
                                <div class="text-caption">Media</div>
                            </div>
                        </div>
                        <div class="col-3 self-center" @click="$router.push(`/user/${Auth.auth.id}/event`)">
                            <div class="row justify-center">
                                <div class="text-body1 text-bold">
                                    {{ Auth.auth.guest_events.length }}
                                </div>
                            </div>
                            <div class="row justify-center">
                                <div class="text-caption">Acara</div>
                            </div>
                        </div>
                        <div class="col-3 self-center" @click="$router.push(`/user/${Auth.auth.id}/book`)">
                            <div class="row justify-center">
                                <div class="text-body1 text-bold">
                                    {{ Auth.auth.books_count }}
                                </div>
                            </div>
                            <div class="row justify-center">
                                <div class="text-caption">Buku</div>
                            </div>
                        </div>
                    </div>
                    <div class="row q-pt-md">
                        <div class="text-body2 text-teal q-pb-sm" v-if="Auth.auth.kta_id">
                            No Anggota: {{ Auth.auth.kta_id }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="text-caption q-pb">
                            {{ Auth.auth.email }}
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-caption q-pb text-bold"  v-if="Auth.auth.profile.province">
                            DPW {{ Auth.auth.profile.province.name }}
                        </div>
                         <div class="text-caption q-pb text-bold"  v-if="Auth.auth.profile.city">
                            DPD {{ Auth.auth.profile.city.name }}
                        </div>
                         <div class="text-caption q-pb text-bold"  v-if="Auth.auth.profile.district">
                            DPC {{ Auth.auth.profile.district.name }}
                        </div>
                    </div>
                    
                     <!-- <div class="row">
                        <div class="text-caption q-pb-sm">
                          <appreciation-badge-component :items="Auth.auth.appreciations"></appreciation-badge-component>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="text-caption" v-if="Auth.auth.profile" v-linkified style="overflow-wrap:break-word; white-space:pre-line">
                            {{ Auth.auth.profile.long_bio }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <q-btn-group spread>
                            <q-btn dense @click="$router.push('/account/edit')">
                                <div class="text-caption">Edit Profile</div>
                            </q-btn>
                            <q-btn dense @click="$router.push('/user/documentlist/'+Auth.auth.id)">
                                <div class="text-caption">Dokumen</div>
                            </q-btn>
                            <q-btn icon-right="keyboard_arrow_down" dense @click="
                  selected_view_post.value == view_posts[0].value
                    ? (selected_view_post = view_posts[1])
                    : (selected_view_post = view_posts[0])
                ">
                                <div class="text-caption">{{ selected_view_post.label }}</div>
                            </q-btn>
                        </q-btn-group>
                    </div>
                </div>
                <post-photo-component v-if="selected_view_post.value == 'photo'"></post-photo-component>
                <post-text-component v-if="selected_view_post.value == 'text'"></post-text-component>
            </q-pull-to-refresh>
        </q-page>
    </q-page-container>

    <q-drawer side="right" v-model="drawer" show-if-above bordered :width="200" :breakpoint="500" content-class="bg-grey-3">
        <q-scroll-area class="fit">
            <q-list padding class="menu-list">
                <q-item clickable v-ripple @click="$router.push({ name: 'information' })">
                    <q-item-section avatar>
                        <q-icon name="help_outline" size="xs" color="teal" />
                    </q-item-section>

                    <q-item-section>
                        <div class="text-caption">Informasi</div>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="$router.push({ name: 'paymenthistory' })">
                    <q-item-section avatar>
                        <q-icon name="payment" size="xs" color="teal" />
                    </q-item-section>

                    <q-item-section>
                        <div class="text-caption">Riwayat Pembayaran</div>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="$router.push('/bookmark')">
                    <q-item-section avatar>
                        <q-icon name="bookmark_border" size="xs" color="teal" />
                    </q-item-section>

                    <q-item-section>
                        <div class="text-caption">Disimpan</div>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="$router.push('/sharedmedia')">
                    <q-item-section avatar>
                        <q-icon name="o_share" size="xs" color="teal" />
                    </q-item-section>

                    <q-item-section>
                        <div class="text-caption">Dibagikan ke SISWA PAI</div>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple disable>
                    <q-item-section avatar>
                        <q-icon name="favorite_outline" size="xs" color="teal" />
                    </q-item-section>

                    <q-item-section>
                        <div class="text-caption">Postingan yang disukai</div>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="onLogout">
                    <q-item-section avatar>
                        <q-icon name="logout" size="xs" color="teal" />
                    </q-item-section>

                    <q-item-section>
                        <div class="text-caption">Logout</div>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="onLogout">
                    <q-toggle v-model="isQuestionnary" color="teal" @input="setIsQuestionnary" />

                    <q-item-section>
                        <div class="text-caption">Dapatkan Survey terbaru</div>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
import ImageZoomer from "components/ImageZoomerComponent.vue";
import AppreciationBadgeComponent from 'components/user/AppreciationBadgeComponent.vue';

export default {
    components: {
        PostPhotoComponent: () =>
            import("components/account/PostPhotoComponent.vue"),
        PostTextComponent: () => import("components/account/PostTextComponent.vue"),
        AppreciationBadgeComponent
    },
    created() {
        this.isQuestionnary = this.Setting.isQuestionnary;
    },
    data() {
        return {
            drawer: false,
            isQuestionnary: false,
            view_posts: [{
                    label: "Post Media",
                    value: "photo"
                },
                {
                    label: "Post Teks",
                    value: "text"
                }
            ],
            selected_view_post: {
                label: "Post Media",
                value: "photo"
            }
        };
    },
    methods: {
        getAuth(done) {
            this.$store.dispatch("Auth/getAuth").then(res => {
                if (done) done();
            });
        },
        onLogout() {
            this.$router.push("/login").then(() => {
                this.$store.dispatch("Auth/logout");
            });
        },
        zoom(src) {
            this.$q
                .dialog({
                    component: ImageZoomer,
                    parent: this,
                    src: src
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
        },
        setIsQuestionnary() {
            this.$store.dispatch('Setting/setIsQuestionnary')
            //if(this.isQuestionnary)this.$q.notify('Anda akan mendapatkan kuesioner terbaru setiap kali Login')

        }
    },
    computed: {
        ...mapState(["Setting", "Auth"])
    }
};
</script>

<style></style>
