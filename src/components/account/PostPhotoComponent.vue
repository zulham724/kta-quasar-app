<template>
  <div>
    <div
      class="row q-pt-md justify-center q-mt-lg"
      v-if="Auth.auth.posts.filter(post => post.files.length).length == 0"
    >
      <q-img src="statics/images/no-image.gif" width="50vw"></q-img>
    </div>
    <div class="row q-pt-md">
      <div
        class="col-4"
        style="padding:0.4vw"
        v-for="post in Auth.auth.posts.filter(post => post.files.length)"
        :key="post.id"
        @click="$router.push(`/user/photolist/${Auth.auth.id}/${post.id}`)"
      >
        <div v-if="post.files[0].type">
          <q-img
            v-if="post.files[0].type.includes('image')"
            :src="`${Setting.storageUrl}/${post.files[0].src}`"
            ratio="1"
            no-default-spinner
          />
          <q-img
            v-if="post.files[0].type.includes('video')"
            :src="`${Setting.storageUrl}/${post.files[0].value}`"
            ratio="1"
            no-default-spinner
          >
            <q-badge floating transparent><q-icon size="xs" name="videocam"></q-icon></q-badge>
          </q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["Auth", "Setting"])
  }
};
</script>

<style>
  .q-img__content > div {
    background: none
  }
</style>
