<template>
  <div class="bg-grey-5">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-icon name="home" color="teal" size="sm" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Home</div>
        </q-toolbar-title>

        <q-btn flat round icon="search" color="teal"/>
        <q-btn
          color="teal"
          flat
          round
          icon="send"
          style="transform: rotate(-20deg);"
          @click="$router.push('/globalchat')"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-pull-to-refresh @refresh="refresh" color="teal">
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-2 self-center">
                <q-avatar size="lg">
                  <img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
                </q-avatar>
              </div>
              <div class="col-10" @click="$router.push('/post/create')">
                <q-input
                  rounded
                  dense
                  outlined
                  label="Diskusi hari ini"
                  readonly
                >
                  <template v-slot:after>
                    <div>
                      <q-btn flat round icon="add_photo_alternate" />
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-infinite-scroll @load="onLoad" :offset="250">
          <div class="q-pt-sm row items-start q-gutter-sm">
            <q-intersection
              v-for="post in Post.posts.data"
              :key="post.id"
              :style="
                `min-height: ${
                  post.files.length ? '80vh' : '40vh'
                };width: 100vw`
              "
              transition="scale"
            >
              <post-item-component :post="post"></post-item-component>
            </q-intersection>
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="teal" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>
    </q-page-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    PostItemComponent: () => import("components/PostItemComponent.vue")
  },
  computed: {
    ...mapState(["Post", "Setting", "Auth"])
  },
  created() {
    if (!this.Post.posts.data) this.$store.dispatch("Post/index");
  },
  methods: {
    onLoad(index, done) {
      this.Post.posts.next_page_url
        ? this.$store.dispatch("Post/next").then(res => done())
        : done();
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
