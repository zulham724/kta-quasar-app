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
            {{ name }}
          </div>
        </q-toolbar-title>
        <q-select label="Urutkan" @input="item=>item.handler()" style="width:40%" color="teal" filled :options="sorts" v-model="selected" option-label="name" dense/>
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
      cities: [],
      sorts:[
        {
          name: 'Jumlah terbanyak',
          handler: ()=> this.sortCountDesc()
        },{
          name: 'Jumlah terkecil',
          handler: ()=> this.sortCountAsc()
        }
      ],
      selected: null
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
    },
    sortCountDesc(){
      this.cities = this.cities.sort((a,b)=>(a.users_count < b.users_count) ? 1 : -1)
    },
    sortCountAsc(){
      this.cities = this.cities.sort((a,b)=>(a.users_count > b.users_count) ? 1 : -1)
    },
  }
};
</script>

<style></style>
