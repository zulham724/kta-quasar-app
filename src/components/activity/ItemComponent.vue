<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar size="lg" v-if="user != null">
        <q-img :src="`${Setting.storageUrl}/${user.avatar}`"></q-img>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <div class="text-caption text-bold" v-if="user != null">{{user.name}}</div>
        <div class="text-caption">{{notif.text}}</div>
      </q-item-label>
      <q-item-label caption>
        <div class="text-caption text-grey">4 jam</div>
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="post != null">
      <q-avatar size="lg" square>
        <q-img :src="`${Setting.storageUrl}/${post.files[0].src}`"/>
      </q-avatar>
    </q-item-section>
  </q-item>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    notif: null
  },
  computed:{
    ...mapState(['Setting','Auth'])
  },
  data(){
    return {
      user: null,
      post: null
    }
  },
  mounted(){
    this.getUser()
    this.getPost()
  },
  methods:{
    getUser(){
      this.$store.dispatch('User/show',this.notif.senderId).then(res=>{
        this.user = res.data
      })
    },
    getPost(){
      this.$store.dispatch('Post/show',this.notif.postId).then(res=>{
        this.post = res.data
      })
    }
  }
}
</script>

<style>

</style>
