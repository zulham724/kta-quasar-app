<template>
<div>
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
              <q-toolbar-title>
                <!-- <div class="row q-pa-2">
                    <div class="text-body2 text-teal text-bold">{{ Auth.auth.name }}</div>
                </div> -->
                  <div class="col">
                    <div class="text-body2 text-teal text-bold">  {{ user ? user.name : null }}</div>

                    <div class="text-caption">
                          <appreciation-badge-component :items="user.appreciations"></appreciation-badge-component>
                        </div>
                    </div>
            </q-toolbar-title>
            
        </q-toolbar>
    </q-header>

    <q-page v-if="user != null">
        <q-pull-to-refresh @refresh="getUser" color="teal">
            <div class="q-pa-md">
                <div class="row">
                    <div class="col-3">
                        <div class="row justify-start align-center">
                            <q-avatar size="80px" @click="zoom(user.avatar)">
                                <q-img :src="`${Setting.storageUrl}/${user.avatar}`" no-default-spinner />
                            </q-avatar>
                        </div>
                    </div>
                    <div class="col-3 self-center">
                        <div class="row justify-center">
                            <div class="text-body1 text-bold">
                                {{ user.posts.filter(item => item.files.length).length }}
                            </div>
                        </div>
                        <div class="row justify-center">
                            <div class="text-caption">Media</div>
                        </div>
                    </div>
                    <div class="col-3 self-center" @click="$router.push(`/user/${user.id}/event`)">
                        <div class="row justify-center">
                            <div class="text-body1 text-bold">
                                {{ user.guest_events.length }}
                            </div>
                        </div>
                        <div class="row justify-center">
                            <div class="text-caption">Acara</div>
                        </div>
                    </div>
                    <div class="col-3 self-center" @click="$router.push(`/user/${user.id}/book`)">
                        <div class="row justify-center">
                            <div class="text-body1 text-bold">
                                {{ user.books_count }}
                            </div>
                        </div>
                        <div class="row justify-center">
                            <div class="text-caption">Buku</div>
                        </div>
                    </div>
                </div>
                <div class="row q-pt-md">
                    <div class="text-body2 text-teal q-pb-sm" v-if="user.kta_id">
                        No Anggota: {{ user.kta_id }}
                    </div>
                </div>
                <div class="row">
                    <div class="text-caption">
                        {{ user.email }}
                    </div>
                </div>
                 <div class="col">
                        <div class="text-caption q-pb text-bold"  v-if="user.profile.province">
                            DPW {{ user.profile.province.name }}
                        </div>
                         <div class="text-caption q-pb text-bold"  v-if="user.profile.city">
                            DPD {{ user.profile.city.name }}
                        </div>
                         <div class="text-caption q-pb text-bold"  v-if="user.profile.district">
                            DPC {{ user.profile.district.name }}
                        </div>
                    </div>
                 <!-- <div class="row">
                    <div class="text-caption q-pb-sm">
                        <appreciation-badge-component :items="user.appreciations"></appreciation-badge-component>
                    </div>
                </div> -->
                <div class="row">
                    <div class="text-caption" v-if="user.profile" v-linkified style="overflow-wrap:break-word; white-space:pre-line">
                        {{ user.profile.long_bio }}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <q-btn-group spread>
                        <!-- <q-btn dense @click="$q.notify('Dalam kontruksi')">
                            <div class="text-caption">Kirim pesan</div>
                        </q-btn>-->
                        <q-btn dense @click="$router.push('/user/documentlist/'+userId)">
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
            <post-photo-component :user="user" v-if="selected_view_post.value == 'photo'"></post-photo-component>
            <post-text-component :user="user" v-if="selected_view_post.value == 'text'"></post-text-component>
        </q-pull-to-refresh>
    </q-page>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import ImageZoomer from "components/ImageZoomerComponent.vue";
import AppreciationBadgeComponent from 'components/user/AppreciationBadgeComponent.vue';

export default {
    props: {
        userId: null
    },
    components: {
        PostPhotoComponent: () => import("components/user/PostPhotoComponent.vue"),
        PostTextComponent: () => import("components/user/PostTextComponent.vue"),
        AppreciationBadgeComponent
    },
    created() {
        if (this.userId == this.Auth.auth.id)
            this.$router.push({
                name: "account"
            });
        this.getUser();
    },
    data() {
        return {
            user: null,
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
        getUser(done) {
            this.$store.dispatch("User/show", this.userId).then(res => {
                this.user = res.data;
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
        }
    },
    computed: {
        ...mapState(["Setting", "Auth"])
    }
};
</script>

<style></style>
