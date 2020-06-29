<template>
  <div>
    <q-item clickable v-ripple v-if="comment != null">
      <q-item-section avatar top class="q-pt-md" @click="$router.push(`/user/profile/${comment.user.id}`)">
        <q-avatar>
          <q-img :src="`${Setting.storageUrl}/${comment.user.avatar}`" no-default-spinner />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <div class="text-caption text-black text-bold" @click="$router.push(`/user/profile/${comment.user.id}`)">{{ comment.user.name }}</div>
        </q-item-label>
        <q-item-label caption>
          <div class="text-caption text-black" v-linkified>{{ comment.value }}</div>
        </q-item-label>
        <q-item-label caption>
          <div class="row">
            <div class="text-caption text-grey q-pr-md">
              {{comment.created_at | moment('from','now')}}
            </div>
            <div class="text-caption text-grey text-bold" v-show="comment.likes_count" @click="$router.push(`/post/comment/like/${comment.id}`)">{{comment.likes_count}} suka</div>
          </div>
        </q-item-label>
      </q-item-section>

      <q-item-section side top class="q-pt-md">
        <q-btn
          flat
          size="sm"
          round
          :color="comment.liked_count ? 'red' : null"
          :icon="comment.liked_count ? 'favorite' : 'favorite_border'"
          @click="comment.liked_count ? dislike(comment.id) : like(comment.id)"
        />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    comment: null,
  },
  computed: {
    ...mapState(["Setting",'Auth'])
  },
  methods: {
    like(commentId) {
      this.$store.dispatch("PostComment/like", commentId).then(res => {
        this.comment.liked_count = res.data.liked_count
        this.comment.likes_count = res.data.likes_count
      });
    },
    dislike(commentId) {
      this.$store.dispatch("PostComment/dislike", commentId).then(res => {
        this.comment.liked_count = res.data.liked_count
        this.comment.likes_count = res.data.likes_count
      });
    }
  }
};
</script>

<style></style>
