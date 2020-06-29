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
            Cari Buku
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-select
        color="teal"
        square
        v-model="selectedcategory"
        label="Kata Kunci"
        class="q-ml-sm q-mr-sm"
        :options="BookCategory.bookcategories"
        option-label="name"
        option-value="id"
        emit-value
        map-options
        @input="getBooksByCategory()"
      />
      <q-list bordered class="rounded-borders">
        <q-intersection
          v-for="book in books" :key="book.id"
          :style="
            `min-height: 10vh;width: 100vw`
          "
          transition="scale"
        >
        <item-component :book="book"></item-component>
        </q-intersection>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {
    ItemComponent: () => import("components/book/ItemComponent.vue")
  },
  data() {
    return {
      books: [],
      selectedcategory: null
    };
  },
  computed:{
    ...mapState(['BookCategory'])
  },
  mounted() {
    if(this.BookCategory.bookcategories.length == 0) this.getBookCategory()
  },
  methods: {
    getBookCategory(){
      this.$store.dispatch('BookCategory/index')
    },
    getBooksByCategory() {
      this.$store
        .dispatch("Book/searchByCategory", this.selectedcategory)
        .then(res => {
          this.books = res.data.books;
        });
    }
  }
};
</script>

<style></style>
