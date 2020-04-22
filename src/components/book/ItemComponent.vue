<template>
  <div>
    <q-item clickable v-ripple v-if="book != null" @click="showMenu()">
      <q-item-section avatar>
        <q-avatar square>
          <q-img :src="`${Setting.storageUrl}/${book.thumbnail}`" width="15vw" no-default-spinner />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="3">{{ book.title }}</q-item-label>
        <q-item-label caption lines="2" v-if="book.book_category">
          {{ book.book_category.name }}
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-avatar>
          <q-img :src="`${Setting.storageUrl}/${book.user.avatar}`" no-default-spinner />
        </q-avatar>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    book: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    showMenu() {
      this.$q
        .bottomSheet({
          message: `Buku ${this.book.name}`,
          actions: [
            {
              label: "Baca",
              img: "statics/icons/absent.webp",
              id: "read"
            },
            {
              label: "Download",
              img: "statics/icons/download.png",
              id: "download"
            },
            this.book.user.id == this.Auth.auth.id
              ? {
                  label: "Hapus",
                  img: "statics/icons/delete.png",
                  id: "destroy"
                }
              : false
          ]
        })
        .onOk(action => {
          // console.log('Action chosen:', action.id)
          if (action.id == "read") {
            cordova.InAppBrowser.open(
              `http://docs.google.com/viewer?url=${this.Setting.storageUrl}/${this.book.file}`,
              "_system",
              "location=no"
            );
          } else if (action.id == "download") {
            cordova.InAppBrowser.open(
              `${this.Setting.storageUrl}/${this.book.file}`,
              "_system",
              "location=yes"
            );
          } else if (action.id == "destroy") {
            this.$q
            .dialog({
              title: "Yakin untuk hapus?",
              message: "Buku tidak akan dapat dikembalikan",
              cancel: true
            })
            .onOk(() => {
              this.$store.dispatch("Book/destroy", this.book.id).then(res => {
                this.$q.notify("Berhasil dihapus");
              });
            });

          }
        })
        .onCancel(() => {
          // console.log('Dismissed')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>

<style></style>
