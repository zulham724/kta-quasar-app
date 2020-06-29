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
            Kartu Tanda Anggota
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding>
        <div class="row justify-center full-width full-height">
          <q-slider
            class="q-ml-lg q-mr-lg"
            v-model="scale"
            :min="0"
            :max="100"
            color="teal"
          />
          <q-img
            :src="`${Setting.url}/img/membercard.jpeg`"
            alt=""
            native-context-menu
            @load="initQR()"
            id="membercard"
            :style="`transform: scale(${scale/100},${scale/100})`"
          >
            <div class="q-pa-md full-width full-height">
              <div
                class="row justify-center align-center"
                style="padding-top:50%"
              >
                <q-avatar square size="100px">
                  <q-img
                    :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"
                    no-default-spinner
                  />
                </q-avatar>
              </div>
              <div
                class="row justify-center align-center"
                style="padding-top:10%"
              >
                <div class="text-body1" style="text-align:center">
                  {{ Auth.auth.name }}
                </div>
              </div>
              <div class="row justify-center align-center">
                <div class="text-body2 text-weight-bold">
                  ({{ Auth.auth.role.display_name }})
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
              <div
                class="row justify-center align-center"
                style="padding-top:5%"
              >
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
  data(){
    return {
      scale: 100
    }
  },
  computed: {
    ...mapState(["Setting", "Auth"]),

  },
  created() {},
  mounted() {},
  methods: {
    initQR() {
      setTimeout(() => {
        QRCode.toCanvas(
          document.getElementById("previewbarcode"),
          this.Auth.auth.id.toString(),
          { scale: 4 },
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
/* #membercard > div {
  transform: scale(0.6,0.6)
} */
</style>
