<template>
<div>
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-caption text-weight-regular text-teal text-bold">
                    Dibagikan ke SISWA PAI
                </div>
                <div class="text-body2 text-weight-regular text-teal text-bold">
                    Semua Media
                </div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page>
        <div class="row">
            <div class="col-4" style="padding:0.4vw" v-for="post in Auth.auth.posts.filter(
            post => post.is_public
          )" :key="post.id" @click="$router.push(`/sharedmedialist/${Auth.auth.id}/${post.id}`)">
                <div v-if="post.files[0].type">
                    <q-img v-if="post.files[0].type.includes('image')" :src="`${Setting.storageUrl}/${post.files[0].src}`" ratio="1" no-default-spinner />
                    <q-img v-if="post.files[0].type.includes('video')" :src="`${Setting.storageUrl}/${post.files[0].value}`" ratio="1" no-default-spinner>
                        <q-badge floating transparent>
                            <q-icon size="xs" name="videocam"></q-icon>
                        </q-badge>
                    </q-img>
                </div>
            </div>
        </div>
    </q-page>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    computed: {
        ...mapState(["Auth", "Setting"])
    },
    created() {
        console.log(this.Auth.auth.posts.filter(post => post.is_public))
    }
};
</script>

<style>
.q-img__content>div {
    background: none
}
</style>
