<template>
  <div>
    <div class="row q-pt-md justify-center q-mt-lg" v-if="Auth.auth.posts.filter(post => post.files.length).length == 0">
      <q-img src="statics/images/no-image.gif" width="50vw"></q-img>
    </div>
    <div class="row q-pt-md">
      <div
        class="col-4"
        style="padding:0.4vw"
        v-for="post in Auth.auth.posts.filter(post => post.files.length)"
        :key="post.id"
      >
        <q-img
          :src="`${Setting.storageUrl}/${post.files[0].src}`"
          ratio="1"
          no-default-spinner
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {

    }
  },
  computed:{
    ...mapState(['Auth','Setting'])
  }
}
</script>

<style>

</style>
