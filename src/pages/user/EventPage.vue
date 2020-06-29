<template>
  <div>
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
          <div class="text-body2 text-teal text-bold" v-if="user">Acara {{user.name}}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page>
      <q-list bordered separator v-if="user">
        <q-item
          clickable
          v-ripple
          v-for="event in user.events"
          :key="event.id"
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
    </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    userId: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      user: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("User/show", this.userId).then(res => {
        this.user = res.data;
      });
    }
  }
};
</script>

<style></style>
