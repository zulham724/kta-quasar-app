<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body2 text-teal text-bold">Buku</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-list bordered class="rounded-borders" v-if="user">
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
          v-for="book in user.books"
          :key="book.id"
          :style="`min-height: 10vh;width: 100vw`"
          transition="scale"
        >
          <item-component :book="book"></item-component>
        </q-intersection>
      </q-list>
    </q-page>
  </div>
</template>

<script>
export default {
  components: {
    ItemComponent: () => import("components/book/ItemComponent.vue")
  },
  props: {
    userId: null
  },
  data(){
    return {
      user: null,
      loading: false
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.$store.dispatch('User/show',this.userId).then(res=>{
        this.user = res.data
      })
    }
  }
}
</script>

<style>

</style>
