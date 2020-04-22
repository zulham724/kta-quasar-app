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
            Kartu Tanda Anggota
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding>
        <div class="row justify-center full-width">
          <q-img
            :src="`${Setting.url}/img/membercard.jpeg`"
            alt=""
            width="90vw"
            height="90vh"
            native-context-menu
            @load="initQR()"
          >
            <div class="q-pa-md full-width full-height">
              <div class="row justify-center align-center" style="padding-top:20vh">
                <q-avatar square style="height:30vw;width:30vw">
                  <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                </q-avatar>
              </div>
              <div class="row justify-center align-center" style="padding-top:5vh">
                <div class="text-body1">
                  {{ Auth.auth.name }}
                </div>
              </div>
              <div class="row justify-center align-center">
                <div class="text-body2">
                  {{ Auth.auth.kta_id != null ? Auth.auth.kta_id : "Kosong" }}
                </div>
              </div>
              <div class="row justify-center align-center">
                <div class="text-body2">
                  {{
                    Auth.auth.profile != null
                      ? Auth.auth.profile.school_place
                      : "Kosong"
                  }}
                </div>
              </div>
              <div class="row justify-center align-center">
                <div class="text-body2">
                  {{ Auth.auth.email }}
                </div>
              </div>
              <div class="row justify-center align-center" style="padding-top:5vh">
                <canvas id="previewbarcode" ref="previewbarcode"></canvas>
              </div>
            </div>
          </q-img>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import QRCode from "qrcode";
export default {
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  created() {},
  mounted() {},
  methods: {
    initQR() {
      setTimeout(() => {
        QRCode.toCanvas(
          document.getElementById("previewbarcode"),
          this.Auth.auth.id.toString(),
          { scale: 6 },
          error => {
            if (error) console.error(error);
            console.log("success!");
          }
        );
      }, 100);
    }
  }
};
</script>

<style>
.q-img__content > div {
  color: black;
  background: none;
}
</style>
