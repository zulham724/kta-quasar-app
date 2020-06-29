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
            Riwayat Pembayaran
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-banner
        dense
        class="bg-red text-white"
        v-if="
          moment(new Date()).diff(
            new Date(Auth.auth.user_activated_at),
            'months',
            true
          ) > 6
        "
      >
        Masa Penggunaan RPP DIGITAL anda sudah habis.Silahkan lakukan iuran
        untuk menambah masa pemakaian.
        <template v-slot:action>
          <q-btn flat color="white" @click="checkAuth()" label="Konfirmasi" />
          <q-btn flat color="white" @click="makePayment()" label="Bayar" />
        </template>
      </q-banner>
      <q-banner
        dense
        class="bg-teal text-white"
        v-if="
          moment(new Date()).diff(
            new Date(Auth.auth.user_activated_at),
            'months',
            true
          ) < 6
        "
      >
        Anda sudah dapat menggunakan aplikasi RPP Digital sampai
        {{
          moment(Auth.auth.user_activated_at)
            .add(6, "M")
            .format("LLLL")
        }}
      </q-banner>
      <q-list bordered padding class="rounded-borders">
        <q-item-label header>Pembayaran anda</q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="payment in Auth.auth.payments"
          :key="payment.id"
        >
          <q-item-section>
            <q-item-label lines="2"
              >{{
                payment.value == "35000"
                  ? "Pendaftaran Sukses Sebesar"
                  : "Iuran Sukses Sebesar"
              }}
              Rp.{{ payment.value.toLocaleString() }}</q-item-label
            >
            <q-item-label caption lines="2">{{
              moment(payment.updated_at).format("LLLL")
            }}</q-item-label>
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
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  methods: {
    moment,
    checkAuth() {
      this.$store.dispatch("Auth/getAuth").then(res => {
        if (
          moment(new Date()).diff(
            new Date(res.data.user_activated_at),
            "months",
            true
          ) > 6
        ) {
          this.$q.notify("Silahkan Tunggu 1x24 jam");
        }
      });
    },
    makePayment() {
      this.loading = true;
      this.$store
        .dispatch("Payment/getPaymentUrl")
        .then(res => {
          cordova.InAppBrowser.open(
            `${res.data.payment_url}`,
            "_system",
            "location=no"
          );
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
