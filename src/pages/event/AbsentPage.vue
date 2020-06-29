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
          <div class="text-body2 text-teal text-bold">Absensi Kegiatan</div>
        </q-toolbar-title>
        <q-btn color="teal" flat label="Scan Barcode" @click="openScanner()" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-list bordered separator v-if="event != null">
        <q-item v-for="user in event.users" :key="user.id" clickable @click="$router.push(`/user/profile/${user.id}`)">
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="`${Setting.storageUrl}/${user.avatar}`" no-default-spinner/>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
            <q-item-label caption>{{
              moment(user.pivot.created_at).format("LLLL")
            }}</q-item-label>
            <q-item-label caption
              >Na.
              {{ user.kta_id == null ? "Kosong" : user.kta_id }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    event: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {

    };
  },
  mounted() {},
  methods: {
    moment,
    openScanner() {
      cordova.plugins.barcodeScanner.scan(
        result => {
          const access = {
            event_id: this.event.id,
            user_id: result.text
          };
          this.$store.dispatch("Event/attendance", access).then(res => {
            this.$store.dispatch('Auth/getAuth')
            this.event = res.data;
          });
        },
        error => {
          this.$q.notify("Terjadi kesalahan");
        },
        {
          preferFrontCamera: true, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Scan barcode Kartu Tanda Anggota disini", // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      );
    }
  }
};
</script>

<style></style>
