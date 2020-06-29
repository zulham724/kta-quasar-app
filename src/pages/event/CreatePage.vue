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
          <div class="text-body2 text-teal text-bold">Buat Kegiatan</div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-form ref="form" class="q-gutter-md">
          <q-input
            color="teal"
            v-model="event.name"
            rounded
            outlined
            dense
            label="Nama Acara*"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            color="teal"
            v-model="event.description"
            type="textarea"
            rounded
            outlined
            dense
            label="Deskripsi Acara*"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            color="teal"
            readonly
            v-model="event.start_at"
            rounded
            outlined
            dense
            label="Tanggal dan Jam*"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="event.start_at" mask="YYYY-MM-DD HH:mm" />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="event.start_at"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            color="teal"
            v-model="event.address"
            rounded
            outlined
            dense
            label="Lokasi Acara*"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
          </q-input>
          <div class="row justify-end">
            <q-btn
              flat
              color="teal"
              label="Terbitkan Acara"
              @click="onSubmit()"
              :loading="loading"
              :disable="loading"
            />
          </div>
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      loading: false,
      event: {}
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true;
          this.$store
            .dispatch("Event/store", this.event)
            .then(res => {
              this.sendNotif();
              this.$q.notify("Acara berhasil dibuat");
              this.$store.dispatch("Auth/getAuth");
              this.$router.back();
            })
            .catch(err => {})
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    sendNotif(){
      const payload = {
        title: `AGPAII DIGITAL`,
        body: `Acara baru dari ${this.Auth.auth.name} - ${this.event.name}`,
        // params:{
        //   sender_id: this.Auth.auth.id, // hanya formatt, tidak dipakai untuk db
        //   target_id: this.event.id, // hanya formatt, tidak dipakai untuk db
        //   target_type: `App\Event`, // hanya formatt, tidak dipakai untuk db
        //   text: `Acara baru dari ${this.Auth.auth.name} - ${this.event.name}`, // hanya formatt, tidak dipakai untuk db
        // },
        to: `/topics/events`
      }
      this.$store.dispatch('Notif/send',payload).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style></style>
