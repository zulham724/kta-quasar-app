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
          <div class="text-body2 text-teal text-bold">Daftar Anggota</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-list bordered padding class="rounded-borders" v-if="district != null">
        <q-item
          clickable
          v-ripple
          v-for="user in district.users"
          :key="user.id"
          @click="$router.push(`/user/profile/${user.id}`)"
        >
          <q-item-section avatar>
              <q-avatar>
                <q-img :src="`${Setting.storageUrl}/${user.avatar}`" no-default-spinner/>
              </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{user.name}}</q-item-label>
            <q-item-label caption>
              <div class="row q-gutter-md">
                <div class="text-caption">{{user.posts.filter(item=>item.files.length).length}} Media</div>
                <div class="text-caption">{{user.guest_events.length}} Acara</div>
                <div class="text-caption">{{user.books.length}} Buku</div>
                <div class="text-caption">{{user.lesson_plans_count}} RPP</div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- <v-container style="text-align:left" v-if="district != null">
        <v-row>
          <v-list subheader>
            <v-subheader>{{ district.name }}</v-subheader>
            <v-list-item
              v-for="user in district.users"
              :key="user.id"
              @click="$router.push(`/user/${user.id}`)"
            >
              <v-list-item-avatar>
                <v-img :src="`${Setting.storageUrl}/${user.avatar}`"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="user.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-container> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    districtId: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      district: null,
      loading: false
    };
  },
  mounted() {
    this.getDistrict();
  },
  methods: {
    getDistrict() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        this.$store
          .dispatch("District/show", this.districtId)
          .then(res => {
            this.district = res.data;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      });
    }
  }
};
</script>

<style></style>
