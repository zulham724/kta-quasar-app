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
          <div class="text-body1 text-teal text-bold">Aplikasi AGPAII lainnya</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
        <q-list bordered separator>
          <q-item
            v-for="app in applications"
            :key="app.name"
          >
            <q-item-section avatar>
              <q-icon name="phone_android" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ app.name }}</q-item-label>
              <q-item-label caption>{{ app.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data(){
    return {
      applications:[{
        name:'RPP AGPAII DIGITAL',
        description: '',
        src: ''
      },{
        name:'PENILAIAN AGPAII DIGITAL',
        description: '',
        src: ''
      }]
    }
  }
};
</script>

<style></style>
