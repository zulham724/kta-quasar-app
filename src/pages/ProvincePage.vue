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
        <q-select label="Urutkan" @input="item=>item.handler()" style="width:40%" color="teal" filled :options="sorts" v-model="selected" option-label="name" dense/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered padding class="rounded-borders">
        <q-item-label header>Jumlah anggota tiap provinsi</q-item-label>

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
    if (this.provinces.length == 0) this.getProvinces();
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
            this.provinces = res.data;
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    sortCountDesc(){
      this.provinces = this.provinces.sort((a,b)=>(a.users_count < b.users_count) ? 1 : -1)
    },
    sortCountAsc(){
      this.provinces = this.provinces.sort((a,b)=>(a.users_count > b.users_count) ? 1 : -1)
    },
  }
};
</script>

<style></style>
