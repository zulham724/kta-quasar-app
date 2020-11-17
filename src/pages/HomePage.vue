<template>
<div class="bg-grey-5">
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-icon name="home" color="teal" size="sm" />
            <q-toolbar-title>
                <div class="text-body2 text-teal text-bold">Home</div>
            </q-toolbar-title>

            <q-btn flat round icon="search" color="teal" @click="$router.push({ name: 'usersearch' })" />
            <q-btn flat round icon="notifications" color="teal">
             <q-badge v-if="EchoNotification.unread_count>0" color="red" floating>{{EchoNotification.unread_count}}</q-badge>
                    <q-menu anchor="bottom right" self="top right" auto-close transition-show="scale" transition-hide="scale">
                        <q-list style="width:250px;border:2px solid #197; border-radius:5px">
                            <q-item>
                                <q-item-section class="text-center">
                                    <div class="text-weight-bold" style="font-size:15px">
                                        Pemberitahuan
                                    </div>
                                </q-item-section>
                            </q-item>
                            <announcement-item-list></announcement-item-list>
                            <q-item>
                                <q-item-section class="text-center">
                                    <div class="text-weight-bold text-teal" style="font-size:13px" clickable @click="$router.push('/announcement')">
                                        Lihat Semua
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
            </q-btn>
            <!--<q-btn color="teal" flat round icon="send" style="transform: rotate(-20deg);" @click="$q.notify('Dalam kontruksi')" />-->
        </q-toolbar>
    </q-header>
    <q-page style="background-color:#E0F2F1">
        <q-pull-to-refresh @refresh="refresh" color="teal">
            <q-card v-if="Auth.auth" style="background-color:#F2F2F2">
                <q-card-section>
                    <div class="row">
                        <div class="col-2 self-center">
                            <q-avatar size="lg">
                                <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                            </q-avatar>
                        </div>
                        <div class="col-10" @click="$router.push('/post/create')">
                            <q-input rounded dense outlined label="Diskusi hari ini" readonly>
                                <template v-slot:after>
                                    <div>
                                        <q-btn flat round icon="add_photo_alternate" color="teal" />
                                    </div>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <q-infinite-scroll @load="onLoad" :offset="250">
                <div class="q-pt-sm row items-start q-gutter-sm">
                    <div v-if="!this.Post.posts.data" style="width:100%">
                        <q-card flat bordered class="q-mt-sm" style="width:100%" v-for="n in 3" :key="`loading-${n}`">
                            <q-item>
                                <q-item-section avatar>
                                    <q-skeleton type="QAvatar" animation="fade" />
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>
                                        <q-skeleton type="text" animation="fade" />
                                    </q-item-label>
                                    <q-item-label caption>
                                        <q-skeleton type="text" animation="fade" />
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-skeleton height="200px" square animation="fade" />

                            <q-card-section>
                                <q-skeleton type="text" class="text-subtitle2" animation="fade" />
                                <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
                            </q-card-section>
                        </q-card>
                    </div>
                    <q-intersection v-for="post in Post.posts.data" :key="post.id" :style="
                `min-height: ${
                  post.size
                    ? `${post.size.height}`
                    : (post.files.length
                    ?  (post.files[0].value=='document'?'40vh': '80vh')
                    : '30vh')
                };width: 100vw`
              ">
                        <item-component :post="post"></item-component>
                    </q-intersection>
                </div>
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="teal" size="40px" />
                    </div>
                </template>
            </q-infinite-scroll>
        </q-pull-to-refresh>
    </q-page>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    components: {
        ItemComponent: () => import("components/post/ItemComponent.vue"),
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),

    },
    computed: {
        ...mapState(["Post", "Setting", "Auth", "EchoNotification"
])
    },
    created() {
        if (!this.Post.posts.data) this.$store.dispatch("Post/index");
    },
    methods: {
        onLoad(index, done) {
            this.Post.posts.next_page_url ?
                this.$store.dispatch("Post/next").then(res => done()) :
                done();
        },
        refresh(done) {
            this.$store.dispatch("Post/index").then(res => {
                done();
            });
        }
    }
};
</script>

<style></style>
