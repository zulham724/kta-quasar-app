<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-icon name="apps" color="teal" size="sm" />
        <q-toolbar-title>
          <div class="text-body2 text-teal text-bold">Fitur</div>
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
        <q-item clickable v-ripple @click="goToPage('/murottal')">
          <q-item-section>
            Murottal
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToPage('/dailyprayer')">
          <q-item-section>
            Doa Harian
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="goToApp(null, 'org.agpaiidigital.rpp')"
        >
          <q-item-section>
            RPP Digital
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="goToApp(null, 'org.agpaiidigital.assigment.app')"
        >
          <q-item-section>
            Penilaian Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple disable>
          <q-item-section>
            Modul Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple disable>
          <q-item-section>
            Marketplace
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
  data() {
    return {};
  },
  methods: {
    goToApp(url = null, package_name = null) {
      if (package_name == null && url) {
        cordova.InAppBrowser.open(`${url}`, "_system", "location=no");
      } else {
        var successCallback = data => {
          window.plugins.launcher.launch(
            { packageName: package_name },
            successCallback,
            errorCallback
          );
        };
        var errorCallback = errMsg => {
          cordova.InAppBrowser.open(
            `https://play.google.com/store/apps/details?id=${package_name}`,
            "_system",
            "location=no"
          );
        };

        window.plugins.launcher.canLaunch(
          { packageName: package_name },
          successCallback,
          errorCallback
        );
      }
    },
    goToPage(page) {
      this.$router.push(page);
    }
  }
};
</script>

<style></style>
