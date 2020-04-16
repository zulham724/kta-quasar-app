<template>
  <div>
    <div class="row q-gutter-sm">
      <q-intersection
        v-for="post in Auth.auth.posts.filter(post=>post.files.length == 0)"
        :key="post.id"
        :style="`min-height: 40vh;width: 100vw`"
        transition="scale"
      >
        <post-item-component :post="post"></post-item-component>
      </q-intersection>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {
    PostItemComponent: () => import("components/PostItemComponent.vue")
  },
  computed:{
    ...mapState(['Auth','Setting'])
  }
}
</script>

<style>

</style>
