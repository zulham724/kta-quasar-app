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
          <div class="text-body2 text-teal text-bold">
            Tambah Baru
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <q-form ref="form">
          <q-input
            v-model="form.title"
            label="Judul Buku*"
            lazy-rules
            dense
            rounded
            outlined
            color="teal"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-select
            dense
            rounded
            outlined
            color="teal"
            v-model="form.book_category"
            :options="BookCategory.bookcategories"
            option-label="name"
            option-value="id"
            label="Kategori*"
            :rules="[val => !!val || 'Please type something']"
            @input="item => (form.book_category_id = item.id)"
          />
          <q-file
            dense
            rounded
            outlined
            color="teal"
            v-model="form.file"
            label="Upload file PDF"
            style="width:50%"
            accept="application/pdf"
          />
          <div class="row justify-end">
            <q-btn
              label="Submit"
              color="teal"
              rounded
              outline
              @click="onSubmit()"
              :loading="loading"
              :disable="loading"
            />
          </div>
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        book_category_id: null,
        title: "",
        file: null
      },
      loading: false
    };
  },
  computed: {
    ...mapState(["Setting", "Auth", "BookCategory"])
  },
  mounted() {
    if (this.BookCategory.bookcategories.length == 0) this.getBookCategories();
  },
  methods: {
    getBookCategories() {
      this.$store.dispatch("BookCategory/index");
    },
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (success && this.form.file != null) {
          this.loading = true;
          let access = new FormData();
          access.append("book_category_id", this.form.book_category_id);
          access.append("title", this.form.title);
          access.append("file", this.form.file);
          this.$store
            .dispatch("Book/store", access)
            .then(res => {
              this.sendNotif();
              this.$q.notify("Buku berhasil diupload");
            })
            .finally(() => {
              this.loading = false;
            });
            this.$q.notify('Dalam proses')
            this.$router.back();
        } else {
          this.$q.notify("Periksa kembali");
        }
      });
    },
    sendNotif(){
      const payload = {
        title: `AGPAII DIGITAL`,
        body: `Buku baru telah rilis dari ${this.Auth.auth.name} - ${this.form.title}`,
        // params:{
        //   sender_id: this.Auth.auth.id, // hanya formatt, tidak dipakai untuk db
        //   target_id: this.event.id, // hanya formatt, tidak dipakai untuk db
        //   target_type: `App\Event`, // hanya formatt, tidak dipakai untuk db
        //   text: `Acara baru dari ${this.Auth.auth.name} - ${this.event.name}`, // hanya formatt, tidak dipakai untuk db
        // },
        to: `/topics/books`
      }
      this.$store.dispatch('Notif/send',payload).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style></style>
