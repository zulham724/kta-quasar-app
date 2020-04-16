<template>
  <div style="width:100%">
    <q-card v-if="post != null" style="min-height:40vh">
      <q-card-section style="padding-bottom:0">
        <div class="row">
          <div class="col-2 self-center">
            <q-avatar size="lg">
              <img :src="`${Setting.storageUrl}/${post.author_id.avatar}`" />
            </q-avatar>
          </div>
          <div class="col-8 self-center">
            {{ post.author_id.name }}
          </div>
          <div class="col-2 self-center">
            <div class="row justify-end">
              <q-btn
                flat
                round
                icon="delete"
                v-if="post.author_id.id == Auth.auth.id"
                @click="destroy()"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none" v-if="post.files.length">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          :navigation="post.files.length > 1"
          control-color="white"
          class="rounded-borders q-pa-none"
        >
          <q-carousel-slide style="q-pa-none" v-for="(file,f) in post.files" :key="file.id" :name="f" class="column no-wrap flex-center">
            <q-img :src="`${Setting.storageUrl}/${file.src}`" ratio="1" spinner-color="teal" />
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
      <q-card-section style="padding-bottom:0;padding-top:0">
        <div class="row">
          <div class="col-12">
            <VueReadMoreSmooth
              :lines="5"
              text="Lihat selengkapnya"
              text-less="Perkecil"
            >
              <div
                class="text-caption"
                style="overflow-wrap:break-word; white-space:pre-line"
              >
                {{ post.body }}
              </div>
            </VueReadMoreSmooth>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div
            class="col-6 self-center"
            @click="$router.push(`/post/comment/${post.id}`)"
          >
            <div class="text-caption text-grey">
              {{
                post.comments.length
                  ? `Lihat Semua ${post.comments.length} Komentar`
                  : "Lihat Komentar"
              }}
            </div>
          </div>
          <div class="col-6">
            <div class="row justify-end">
              <q-btn
                flat
                round
                :color="post.liked_count ? 'red' : null"
                :icon="post.liked_count ? 'favorite' : 'favorite_border'"
                @click="post.liked_count ? dislike() : like()"
              />
              <q-btn
                flat
                round
                icon="message"
                @click="$router.push(`/post/comment/${post.id}`)"
              />
            </div>
          </div>
        </div>
        <div class="row justify-end">
          <div class="text-caption text-grey">
            {{ post.created_at | moment("from", "now") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueReadMoreSmooth from "vue-read-more-smooth";
export default {
  props: {
    post: null
  },
  components: {
    VueReadMoreSmooth
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      slide: 0
    };
  },
  methods: {
    destroy() {
      this.$q
        .dialog({
          title: "Yakin untuk hapus?",
          message: "Postingan tidak akan dapat dikembalikan",
          cancel: true
        })
        .onOk(() => {
          this.$q.loadingBar.start();
          this.$store
            .dispatch("Post/destroy", this.post.id)
            .then(res => {
              this.$q.notify("Berhasil menghapus postingan");
            })
            .catch(err => {
              this.$q.notify("Terjadi kesalahan");
            })
            .finally(() => {
              this.$q.loadingBar.stop();
            });
        });
    },
    like() {
      this.$store.dispatch("Post/like", this.post.id).then(res => {
        this.post.liked_count = res.data.liked_count;
        this.post.likes_count = res.data.likes_count;
        this.$forceUpdate();
      });
    },
    dislike() {
      this.$store.dispatch("Post/dislike", this.post.id).then(res => {
        this.post.liked_count = res.data.liked_count;
        this.post.likes_count = res.data.likes_count;
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style>
.q-carousel__slide{
  padding:0
}
</style>
