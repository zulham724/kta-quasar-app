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
            Kab/ Kota Provinsi {{ name }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered padding class="rounded-borders">
        <q-item
          clickable
          v-ripple
          v-for="city in cities"
          :key="city.id"
          @click="$router.push(`/district/${city.name}/${city.id}`)"
        >
          <q-item-section>
            <q-item-label lines="1">{{ city.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label lines="2"
              >{{ city.users_count }} anggota</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    name: null,
    id: null
  },
  data() {
    return {
      cities: []
    };
  },
  mounted() {
    if (this.cities.length == 0) this.getProvinces();
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  methods: {
    getProvinces() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("City/byProvinceId", this.id)
          .then(res => {
            this.cities = res.data.cities;
            this.$forceUpdate();
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<style></style>
