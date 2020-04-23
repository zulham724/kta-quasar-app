<template>
  <q-layout view="hHr LpR lFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Aktivitas</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-list bordered separator>
          <q-item-label header>Hari ini</q-item-label>
          <item-component v-for="(notif,n) in Notif.notifications" :key="n" :notif="notif"></item-component>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components:{
    ItemComponent: ()=> import('components/activity/ItemComponent.vue')
  },
  data(){
    return {

    }
  },
  computed:{
    ...mapState(['Setting','Auth','Notif'])
  },
}
</script>

<style>

</style>
