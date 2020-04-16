<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Komentar</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container v-if="post != null">
      <div class="q-pa-md">
        <div class="row">
          <div class="col-2 self-center">
            <q-avatar>
              <img :src="`${Setting.storageUrl}/${post.author_id.avatar}`" />
            </q-avatar>
          </div>
          <div class="col-10 self-center">
            {{ post.author_id.name }}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="text-caption"
              style="overflow-wrap:break-word; white-space:pre-line"
            >
              {{ post.body }}
            </div>
          </div>
        </div>
      </div>
      <q-list bordered class="rounded-borders">
        <q-item-label header>Komentar</q-item-label>

        <post-item-comment-component
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        ></post-item-comment-component>
      </q-list>
    </q-page-container>

    <q-footer style="padding:5px;background-color:white">
      <q-input
        dense
        label="Tulis sesuatu"
        v-model="comment.value"
        flat
        bg-color="white"
      >
        <template v-slot:after>
          <div>
            <q-btn
              flat
              round
              icon="send"
              :loading="loading"
              :disable="loading"
              @click="store()"
            />
          </div>
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  components:{
    PostItemCommentComponent: ()=> import('components/PostItemCommentComponent')
  },
  props: {
    postId: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      post: null,
      comment: {
        value: ""
      },
      loading: false
    };
  },
  mounted() {
    this.post == null ? this.getPost() : null;
  },
  methods: {
    getPost() {
      this.$store.dispatch("Post/show", this.postId).then(res => {
        this.post = res.data;
      });
    },
    store() {
      this.loading = true
      const payload = {
        post_id: this.post.id,
        user_id: this.Auth.auth.id,
        value: this.comment.value
      };
      this.$store
        .dispatch("PostComment/store", payload)
        .then(res => {
            this.post.comments.splice(0, 0, res.data);
            this.post.comments_like += 1;
            this.comment.value = ''
        })
        .catch(err => {})
        .finally(()=>{
          this.loading = false
        })
    }
  }
};
</script>

<style></style>
