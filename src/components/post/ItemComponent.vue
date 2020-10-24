<template>
<div style="width:100%">
    <!--<q-card v-if="post != null" :style="`${post.files.length ? 'min-height:80vh' : 'min-height:30vh'}`">-->
    <q-card v-if="post != null">
        <q-card-section style="padding-bottom:0">
            <div class="row">
                <div class="col-2 self-center">
                    <q-avatar size="lg" @click="$router.push(`/user/profile/${post.author_id.id}`)">
                        <q-img :src="`${Setting.storageUrl}/${post.author_id.avatar}`" no-default-spinner />
                    </q-avatar>
                </div>
                <div class="col-8 self-center">
                    <div class="row">
                        <div class="col">
                            <div class="text-bold text-body2" @click="$router.push(`/user/profile/${post.author_id.id}`)">
                                {{ post.author_id.name }}
                            </div>
                            <div class="text-grey text-caption" @click="$router.push(`/user/profile/${post.author_id.id}`)">
                                {{ post.author_id.role ? post.author_id.role.display_name : null }} {{post.author_id.profile ? post.author_id.profile.school_place : null}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2 self-center" v-if="Auth.auth">
                    <div class="row justify-end">
                        <q-btn flat round dense size="md" icon="more_vert" v-if="post.author_id.id == Auth.auth.id" @click="showMenu()" />
                    </div>
                </div>
            </div>
        </q-card-section>
        <q-card-section style="padding-bottom:0;" class="q-pt-md">
            <div class="row">
                <div class="col-12">
                    <div class="text-caption" style="overflow-wrap:break-word; white-space:pre-line" v-html="
                post.body.length > 100
                  ? isReadMore
                    ? `${post.body}`
                    : `${post.body.substring(0, 100)}... `
                  : post.body
              " v-linkified></div>
                    <div v-if="post.body.length > 100 && isReadMore == false" @click="$router.push(`/post/comment/${post.id}`)" class="text-caption text-grey">
                        Readmore
                    </div>
                </div>
            </div>
        </q-card-section>
        <!-- <q-card-section class="q-pa-none">
        <q-video
          ratio="1"
          src="https://instagram.fcgk23-1.fna.fbcdn.net/v/t50.2886-16/103553283_126117292432111_8775059075118879134_n.mp4?_nc_ht=instagram.fcgk23-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=lgEjLaIDdlkAX8MTGdr&oe=5EDD1667&oh=9cb553eeac6ea0f8819e431c01ed4d27"
        />
      </q-card-section> -->
        <q-card-section class="q-pa-none" v-if="post.files.length">
            <div v-if="post.files[0].value=='document'">
                <q-input filled :value="post.files[0].name" readonly>
                    <template v-slot:prepend>
                        <q-icon name="note" @click.stop />
                    </template>
                    <template v-slot:append>
                        <q-icon name="vertical_align_bottom" @click.stop="downloadFile" class="cursor-pointer" />
                    </template>

                </q-input>
            </div>
            <div v-else>
                <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated :navigation="post.files.length > 1" control-color="teal" swipeable class="rounded-borders q-pa-none">
                    <q-carousel-slide style="q-pa-none" v-for="(file, f) in post.files" :key="file.id" :name="f" class="column no-wrap flex-center">
                        <q-img v-if="file.type.includes('image')" :src="`${Setting.storageUrl}/${file.src}`" ratio="1" @click="zoom(file)">
                            <template v-slot:loading>
                                <div class="bg-grey-2" style="height:100%;width:100%"></div>
                            </template>
                        </q-img>
                        <vue-plyr v-if="file.type.includes('video')" style="width:100vw">
                            <video preload="none" :poster="`${Setting.storageUrl}/${file.value}`" :src="`${Setting.storageUrl}/${file.src}`"></video>
                        </vue-plyr>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </q-card-section>
        <q-card-section>
            <div class="row">
                <div class="col-6 self-center">
                    <div class="row">
                        <div class="text-caption text-bold" v-show="post.likes_count" @click="$router.push(`/post/like/${post.id}`)">
                            {{ post.likes_count }} Suka
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row justify-end">
                        <!--<q-btn v-if="post.files.length && post.author_id.id == (Auth.auth ? Auth.auth.id : null)" flat round :icon="post.is_public ? 'share' : 'o_share'" @click="post.is_public ? unPublic() : setPublic()" />-->
                        <q-btn flat round :color="post.liked_count ? 'red' : null" :icon="post.liked_count ? 'favorite' : 'favorite_border'" @click="post.liked_count ? dislike() : like()" />
                        <q-btn flat round icon="message" @click="$router.push(`/post/comment/${post.id}`)" />
                        <q-btn v-if="post.files.length" flat round :icon="post.bookmarked ? 'bookmark' : 'bookmark_border'" @click="post.bookmarked ? unBookmark() : bookmark()" />

                    </div>
                </div>
            </div>
            <div class="row justify-between">
                <div class="text-caption text-grey" @click="$router.push(`/post/comment/${post.id}`)">
                    {{
              post.comments.length
                ? `Lihat Semua ${post.comments.length} Komentar`
                : "Lihat Komentar"
            }}
                </div>
                <div class="text-caption text-grey">
                    {{ post.created_at | moment("from", "now") }}
                </div>
            </div>
        </q-card-section>
    </q-card>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import ImageZoomer from "components/ImageZoomerComponent.vue";
import {
    matShare
} from '@quasar/extras/material-icons'

export default {
    props: {
        post: null
    },
    components: {},
    computed: {
        ...mapState(["Setting", "Auth"]),

    },
    data() {
        return {
            slide: 0,
            isReadMore: false,
            dialog: false,
            file: null
        };
    },
    mounted() {

    },
    methods: {
        bookmark() {
            this.$store.dispatch("PostBookmark/store", this.post.id).then(res => {
                this.post.bookmarked = res.data.bookmarked;
                this.post.bookmarks = res.data.bookmarks;
                this.$q.notify("Tersimpan");
                this.$store.dispatch("Auth/getAuth");
                this.$forceUpdate();
            });
        },
        unBookmark() {
            this.$store.dispatch("PostBookmark/destroy", this.post.id).then(res => {
                this.post.bookmarked = res.data.bookmarked;
                this.post.bookmarks = res.data.bookmarks;
                this.$q.notify("Terhapus dari daftar simpan");
                this.$store.dispatch("Auth/getAuth");
                this.$forceUpdate();
            });
        },
        setPublic() {
            this.$store.dispatch("PostPublic/store", this.post.id).then(res => {
                this.post.is_public = res.data.is_public;
                this.$q.notify("Telah dibagikan ke SISWA PAI");
                this.$store.dispatch("Auth/getAuth");
                this.$forceUpdate();
            });
        },
        unPublic() {
            this.$store.dispatch("PostPublic/destroy", this.post.id).then(res => {
                this.post.is_public = res.data.is_public;
                this.$q.notify("Terhapus dari media SISWA PAI");
                this.$store.dispatch("Auth/getAuth");
                this.$forceUpdate();
            });
        },
        zoom(file) {
            this.$q
                .dialog({
                    component: ImageZoomer,
                    parent: this,
                    src: file.src
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
        destroy() {
            this.$q
                .dialog({
                    title: "Yakin untuk hapus?",
                    message: "Postingan tidak akan dapat dikembalikan",
                    cancel: true
                })
                .onOk(() => {
                    this.$q.loadingBar.start();
                    this.$store
                        .dispatch("Post/destroy", this.post.id)
                        .then(res => {
                            this.$store.dispatch("Auth/getAuth");
                            this.$q.notify("Berhasil menghapus postingan");
                        })
                        .catch(err => {
                            this.$q.notify("Terjadi kesalahan");
                        })
                        .finally(() => {
                            this.$q.loadingBar.stop();
                        });
                });
        },
        edit() {
            this.$router.push(`/post/${this.post.id}/edit`);
        },
        like() {
            this.$store.dispatch("Post/like", this.post.id).then(res => {
                if (this.post.author_id.id != this.Auth.auth.id) this.sendNotif();
                this.post.liked_count = res.data.liked_count;
                this.post.likes_count = res.data.likes_count;
                this.$forceUpdate()
            });
        },
        dislike() {
            this.$store.dispatch("Post/dislike", this.post.id).then(res => {
                this.post.liked_count = res.data.liked_count;
                this.post.likes_count = res.data.likes_count;
                this.$forceUpdate()
            });
        },
        showMenu() {
            const share_icon = this.post.is_public ? 'share' : 'o_share'
            const share_label = this.post.is_public ? 'Hapus dari SISWA PAI' : 'Bagikan ke SISWA PAI'
            this.$q
                .bottomSheet({
                    message: `Action`,
                    actions: [
                        this.post.author_id.id == this.Auth.auth.id ? {
                            label: "Edit",
                            icon: "edit",
                            color: "teal",
                            id: "edit"
                        } :
                        false,
                        this.post.author_id.id == this.Auth.auth.id ? {
                            label: "Hapus",
                            icon: "delete",
                            color: "teal",
                            id: "destroy"
                        } :
                        false,
                        this.post.author_id.id == this.Auth.auth.id ? {
                            label: share_label,
                            icon: share_icon,
                            color: "teal",
                            id: "share"
                        } :
                        false
                    ]
                })
                .onOk(action => {
                    // console.log('Action chosen:', action.id)
                    if (action.id == "destroy") {
                        this.destroy();
                    }
                    if (action.id == "edit") {
                        this.edit();
                    }
                    if (action.id == "share") {
                        if (this.post.is_public) this.unPublic();
                        else this.setPublic();
                    }
                })
                .onCancel(() => {
                    // console.log('Dismissed')
                })
                .onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                });
        },
        sendNotif() {
            const payload = {
                title: `AGPAII DIGITAL`,
                body: `Postingan anda disukai oleh ${this.Auth.auth.name}`,
                params: {
                    sender_id: this.Auth.auth.id,
                    target_id: this.post.id,
                    target_type: `Post`,
                    text: `Postingan anda disukai oleh ${this.Auth.auth.name}`
                },
                to: `/topics/user_${this.post.author_id.id}_post_${this.post.id}_like`
            };
            this.$store.dispatch("Notif/send", payload).then(res => {
                console.log(res);
            });
        },
        downloadFile() {
            console.log(this.Setting.storageUrl + '/' + this.post.files[0].src);
            cordova.InAppBrowser.open(`${this.Setting.storageUrl}/${this.post.files[0].src}`, "_system", "location=no");
        }
    }
};
</script>

<style>
.q-carousel__slide {
    padding: 0;
}
</style>
