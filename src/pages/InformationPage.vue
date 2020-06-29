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
            Informasi
          </div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered padding class="rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label lines="1">Nasional</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label lines="2"
              >{{ Setting.count.user_total }} anggota</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item-label header>Top 10 DPW dengan user terbanyak</q-item-label>

        <q-item clickable v-ripple @click="$router.push(`/province`)">
          <q-item-section>
            <q-item-label lines="1">Lihat lebih banyak</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="arrow_forward" />
          </q-item-section>
        </q-item>

        <q-item
          style="max-width: 300px;"
          v-for="n in 5"
          :key="`loading-${n}`"
          v-show="loading"
        >

          <q-item-section>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          v-for="province in provinces"
          :key="province.id"
          @click="$router.push(`/city/${province.name}/${province.id}`)"
        >
          <q-item-section>
            <q-item-label lines="1">{{ province.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label lines="2"
              >{{ province.users_count }} anggota</q-item-label
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
  data() {
    return {
      provinces: [],
      loading: false
    };
  },
  mounted() {
    this.getDetailTotalMember()
    if (this.provinces.length == 0) {
      this.loading = true;
      this.getProvinces().finally(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  methods: {
    getProvinces() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("Province/index")
          .then(res => {
            this.provinces = res.data
              .sort((a, b) => {
                return b.users_count - a.users_count;
              })
              .slice(0, 10);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getCountUser() {
      this.$store.dispatch("Setting/getDetailTotalMember");
    },
    getDetailTotalMember() {
      this.$store.dispatch("Setting/getCountUser");
    }
  }
};
</script>

<style></style>
