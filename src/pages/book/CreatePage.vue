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
          <div class="text-body1 text-teal text-bold">
            Tambah Baru
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <q-form class="q-gutter-md" ref="form">
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
            label="Square outlined"
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
    }
  }
};
</script>

<style></style>
