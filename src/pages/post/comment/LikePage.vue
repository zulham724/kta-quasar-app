<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn
          color="teal"
          flat
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Suka</div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-list bordered class="rounded-borders">
          <div v-if="loading">
            <q-item
              style="max-width: 300px;"
              v-for="n in 9"
              :key="`loading-${n}`"
            >
              <q-item-section avatar>
                <q-skeleton type="QAvatar" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div v-if="comment">
            <q-intersection
              v-for="(user,u) in comment.likes.map(like=>like.user)"
              :key="u"
              :style="`min-height: 10vh;width: 100vw`"
              transition="scale"
            >
              <item-component :user="user"></item-component>
            </q-intersection>
          </div>
        </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{
    commentId: null
  },
  components: {
    ItemComponent: () => import("components/user/ItemComponent.vue")
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      comment: null,
      loading: false
    };
  },
  mounted() {
    this.getComment()
  },
  methods: {
    getComment(){
      this.$store.dispatch('Comment/show',this.commentId).then(res=>{
        this.comment = res.data
      })
    }
  }
};
</script>

<style></style>
