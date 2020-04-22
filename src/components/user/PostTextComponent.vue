<template>
  <div v-if="user != null">
    <div class="row justify-center q-mt-lg" style="opacity:0.5" v-if="user.posts.filter(post=>post.files.length == 0).length == 0">
      <div class="col">
        <center>
          <q-icon name="rate_review" size="40vw" color="grey" />
          <div class="text-body1 text-bold text-grey">Kosong</div>
        </center>
      </div>
    </div>
    <div class="row q-gutter-sm">
      <q-intersection
        v-for="post in user.posts.filter(post=>post.files.length == 0)"
        :key="post.id"
        :style="`min-height: 30vh;width: 100vw`"
      >
        <item-component :post="post"></item-component>
      </q-intersection>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    user: null
  },
  components: {
    ItemComponent: () => import("components/post/ItemComponent.vue")
  },
  computed:{
    ...mapState(['Auth','Setting'])
  }
}
</script>

<style>

</style>
