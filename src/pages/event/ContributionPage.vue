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
          <div class="text-body2 text-teal text-bold">Kegiatan Anda</div>
        </q-toolbar-title>
        <q-space />
        <q-btn
          color="teal"
          flat
          icon="add"
          @click="$router.push('/event/create')"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-pull-to-refresh @refresh="refresh" color="teal">
        <q-list bordered separator>
          <q-item
            clickable
            v-ripple
            v-for="event in Auth.auth.events"
            :key="event.id"
            @click="showMenu(event)"
          >
            <q-item-section avatar>
              <q-icon name="place" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ event.name }}</q-item-label>
              <q-item-label caption>{{ event.address }}</q-item-label>
              <q-item-label caption>{{ event.start_at | moment('LLLL') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-pull-to-refresh>
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
      tab: "mails"
    };
  },
  mounted() {},
  methods: {
    refresh(done) {
      this.$store.dispatch("Auth/getAuth").then(res => {
        done();
      });
    },
    showMenu(event) {
      this.$q
        .bottomSheet({
          message: `Acara ${event.name}`,
          actions: [
            {
              label: "Buat Absen Kegiatan",
              icon: 'fingerprint',
              color: 'teal',
              id: "makeabsent"
            },
            {},
            {
              label: "Hapus",
              icon:'delete',
              color:'teal',
              id: "destroy"
            }
          ]
        })
        .onOk(action => {
          // console.log('Action chosen:', action.id)
          if (action.id == "makeabsent") {
            this.$router.push({
              name: 'eventabsent',
              params:{
                event: event
              }
            });
          } else if (action.id == "destroy") {
            this.$q
              .dialog({
                title: "Yakin untuk hapus?",
                message: "Acara tidak akan dapat dikembalikan",
                cancel: true
              })
              .onOk(() => {
                this.$q.loadingBar.start();
                this.$store
                  .dispatch("Event/destroy", event.id)
                  .then(res => {
                    this.$q.notify("Berhasil menghapus acara");
                    this.$store.dispatch("Auth/getAuth").then(res=>{
                      this.$forceUpdate()
                    });
                  })
                  .catch(err => {
                    this.$q.notify("Terjadi kesalahan");
                  })
                  .finally(() => {
                    this.$q.loadingBar.stop();
                  });
              });
          }
        })
        .onCancel(() => {
          // console.log('Dismissed')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>

<style></style>
