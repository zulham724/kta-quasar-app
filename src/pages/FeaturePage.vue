<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-icon name="apps" color="teal" size="sm" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Fitur</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-list bordered separator>
        <q-item clickable v-ripple @click="goToPage('/membercard')">
          <q-item-section>Kartu Tanda Anggota</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToPage('/book')">
          <q-item-section>
            Buku Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToPage('/murottal')" disable>
          <q-item-section>
            Murottal
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToPage('/dailyprayer')" disable>
          <q-item-section>
            Doa Harian
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToApp('https://play.google.com/store/apps/details?id=org.agpaiidigital.rpp')">
          <q-item-section>
            RPP Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple disable>
          <q-item-section>
            Penilaian Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToApp('https://wasap.at/OLW45f')">
          <q-item-section>
            Hubungi Kami
          </q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    goToApp(url){
      cordova.InAppBrowser.open(
        `${url}`,
        "_system",
        "location=no"
      );
    },
    goToPage(page){
      this.$router.push(page)
    }
  }
};
</script>

<style></style>
