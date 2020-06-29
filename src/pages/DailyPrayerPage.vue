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
            Doa Harian
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered class="rounded-borders">
        <q-item-label header>List doa</q-item-label>
        <item-component v-for="item in DailyPrayer.items" :key="item.id" :item="item"></item-component>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components:{
    ItemComponent:()=>import('components/dailyprayer/ItemComponent.vue')
  },
  computed:{
    ...mapState(['DailyPrayer','Auth','Setting'])
  },
  mounted(){
    if(this.DailyPrayer.items.length == 0) this.init();
  },
  methods:{
    init(){
      this.$store.dispatch('DailyPrayer/index')
    }
  }
}
</script>

<style>

</style>
