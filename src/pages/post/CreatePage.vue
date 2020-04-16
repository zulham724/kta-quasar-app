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
          <div class="text-body1 text-teal text-bold">Buat Diskusi</div>
        </q-toolbar-title>
        <q-space />
        <q-btn color="teal" flat label="Posting" @click="store()" :loading="loading" :disable="loading" />
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
          <div class="row justify-end q-ma-none">
            <q-btn
              size="md"
              color="teal"
              flat
              icon="add_photo_alternate"
              @click="$refs.selectfiles.pickFiles()"
            ></q-btn>
            <q-file
              v-show="false"
              label="Tambahkan foto/ gambar"
              dense
              v-model="files"
              filled
              multiple
              ref="selectfiles"
              outlined
              @input="check()"
              bg-color="transparent"
              display-value
              color="teal"
            >
            </q-file>
          </div>
          <div class="row">
            <div class="col-6 q-pa-sm" v-for="(image, i) in images" :key="i">
              <q-img :src="image" :ratio="1" />
            </div>
          </div>
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      loading: false,
      post: {},
      files: [],
      images: []
    };
  },
  mounted() {},
  methods: {
    onSubmit() {},
    check() {
      this.files.map(file => {
        this.toBase64(file).then(res => {
          this.images.push(res);
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
    store() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true;
          this.$q.notify('Tunggu sebentar')
          this.$router.back();
          let formData = new FormData();
          this.files.forEach(file => {
            formData.append("files[]", file);
          });
          formData.append("title", "KTA POST");
          formData.append("body", this.post.body);
          formData.append("status", "PUBLISHED");
          formData.append("featured", 0);

          this.$store
            .dispatch("Post/store", formData)
            .then(res => {
              this.$store.dispatch('Auth/getAuth')
              this.$q.notify("Berhasil");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style></style>
