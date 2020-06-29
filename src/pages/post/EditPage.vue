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
          <div class="text-body2 text-teal text-bold">Buat Diskusi</div>
        </q-toolbar-title>
        <q-space />
        <q-btn
          color="teal"
          flat
          label="Perbarui"
          @click="update()"
          :loading="loading"
          :disable="loading"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-form ref="form" @submit="onSubmit" class="q-gutter-md">
          <div class="row">
            <div class="col-2 self-center">
              <q-avatar size="lg">
                <img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
              </q-avatar>
            </div>
            <div class="col=10 self-center">
              {{ Auth.auth.name }}
            </div>
          </div>
          <q-input
            color="teal"
            v-model="post.body"
            type="textarea"
            outlined
            autogrow
            label="Diskusi hari ini*"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <div class="list row">
            <div
              class="col-6 q-pa-sm"
              v-for="(item, index) in post.files"
              :key="index"
            >
              <q-img :src="item.src" :ratio="1">
                <q-badge color="white" floating outline>{{
                  index + 1
                }}</q-badge>
              </q-img>
            </div>
          </div>
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import Sortable from "vue-drag-sortable";
export default {
  props: {
    postId: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      loading: false,
      post: {},
      files: [],
      dragData: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("Post/show", this.postId).then(res => {
        this.post = {
          ...res.data,
          files: res.data.files.map(item => {
            item.src = `${this.Setting.storageUrl}/${item.src}`;
            return item;
          })
        };
      });
    },
    onSubmit() {},
    check() {
      this.images = [];
      this.files.map((file, f) => {
        this.toBase64(file).then(res => {
          file.src = res;
          this.$forceUpdate();
          return file;
        });
      });
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    update() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true;
          this.$q.notify("Tunggu sebentar");
          this.$router.back();
          let access = {
            id: this.post.id,
            body: this.post.body
          }
          this.$store
            .dispatch("Post/update", access)
            .then(res => {
              this.sendNotif(res.data);
              this.$store.dispatch("Auth/getAuth");
              this.$q.notify("Berhasil");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    sendNotif(post) {
      const payload = {
        title: `AGPAII DIGITAL`,
        body: `Postingan baru dari ${this.Auth.auth.name} - ${this.post.body}`,
        params: {
          sender_id: this.Auth.auth.id,
          target_id: post.id,
          target_type: `Post`,
          text: `Postingan baru dari ${this.Auth.auth.name} - ${this.post.body}`
        },
        to: `/topics/posts`
      };
      this.$store.dispatch("Notif/send", payload).then(res => {
        console.log(res);
      });
    },
    click(e) {
      // Todo
    },
    sort(e) {
      const { oldIndex, newIndex } = e;
      console.log(oldIndex, newIndex);
    },
    sortend(e, list) {
      const { oldIndex, newIndex } = e;
      this.rearrange(list, oldIndex, newIndex);
    },
    rearrange(array, oldIndex, newIndex) {
      if (oldIndex > newIndex) {
        array.splice(newIndex, 0, array[oldIndex]);
        array.splice(oldIndex + 1, 1);
      } else {
        array.splice(newIndex + 1, 0, array[oldIndex]);
        array.splice(oldIndex, 1);
      }
    }
  }
};
</script>

<style>
.list {
  position: relative; /* position of list container must be set to `relative` */
}
/* dragging item will be added with a `dragging` class */
/* so you can use this class to define the appearance of it */
.list > *.dragging {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
