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
            Buku Digital
          </div>
        </q-toolbar-title>
        <q-btn
          flat
          icon="search"
          color="teal"
          round
          @click="$router.push({ name: 'booksearch' })"
        />
        <q-btn
          flat
          icon="add"
          color="teal"
          round
          @click="$router.push({ name: 'bookcreate' })"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-pull-to-refresh @refresh="getBooks" color="teal">
        <q-list bordered class="rounded-borders">
          <q-item-label header>List buku</q-item-label>
          <q-item
            style="max-width: 300px;"
            v-for="n in 5"
            :key="`loading-${n}`"
            v-show="loading"
          >
            <q-item-section>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-intersection
            v-for="book in Book.books"
            :key="book.id"
            :style="`min-height: 10vh;width: 100vw`"
            transition="scale"
          >
            <item-component :book="book"></item-component>
          </q-intersection>
        </q-list>
      </q-pull-to-refresh>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    ItemComponent: () => import("components/book/ItemComponent.vue")
  },
  computed: {
    ...mapState(["Book"])
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    if (this.Book.books.length == 0) {
      this.loading = true;
      this.getBooks().then(res => {
        this.loading = false;
      });
    }
  },
  methods: {
    getBooks(done) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("Book/index")
          .then(res => {
            if (done) done();
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<style></style>
