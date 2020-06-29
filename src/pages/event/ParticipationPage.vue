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
            Partisipasi Kegiatan Anda
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-pull-to-refresh @refresh="refresh" color="teal">
        <q-list bordered separator>
          <q-item
            v-for="guestevent in Auth.auth.guest_events"
            :key="guestevent.id"
          >
            <q-item-section avatar>
              <q-icon name="place" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Hadir di {{ guestevent.name }}</q-item-label>
              <q-item-label caption>{{
                guestevent.start_at | moment("LLLL")
              }}</q-item-label>
              <q-item-label caption>Di {{ guestevent.address }}</q-item-label>
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
    return {};
  },
  mounted() {},
  methods: {
    refresh() {}
  }
};
</script>

<style></style>
