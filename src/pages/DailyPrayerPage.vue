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
            Doa Harian
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered class="rounded-borders">
        <q-item-label header>List doa</q-item-label>
        <item-component></item-component>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components:{
    ItemComponent:()=>import('components/dailyprayer/ItemComponent.vue')
  }
}
</script>

<style>

</style>
