<template>
  <q-layout view="hHr lpR fFr">
    <q-page-container>
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        dense
        class="bg-grey"
        v-if="MusicPlayer.item"
      >
        <div class="row full-width">
          <div class="col-2">
            <div class="row align-center justify-center">
              <q-btn :icon="MusicPlayer.isPlay ? 'pause' : 'play_arrow'" flat round color="white" @click="MusicPlayer.isPlay ? pause() : resume()" />
            </div>
          </div>
          <div class="col-6 self-center text-center">
            <div class="caption text-white">{{ MusicPlayer.item.name }}</div>
          </div>
          <div class="col-2">
             <div class="row align-center justify-center">
               <q-btn icon="favorite" flat round color="white" @click="$q.notify('Dalam kontruksi')"/>
             </div>
          </div>
          <div class="col-2">
            <div class="row align-center justify-center">
              <q-btn icon="close" flat round color="white" @click="close()" />
            </div>
          </div>
          <div class="col-12">
            <q-linear-progress :value="((this.MusicPlayer.item.audio.currentTime/this.MusicPlayer.item.audio.duration*100)/100)" color="teal" />
          </div>
        </div>
      </q-tabs>
      <q-tabs
        v-model="tab"
        no-caps
        stretch
        class="text-grey"
        active-color="teal"
        indicator-color="transparent"
        align="justify"
      >
        <q-tab
          name="home"
          icon="home"
          @click="$route.name == 'home' ? null : $router.push('/')"
        />
        <q-tab
          name="event"
          icon="event"
          @click="$route.name == 'event' ? null : $router.push('/event')"
        />
        <q-tab
          name="feature"
          icon="apps"
          @click="$route.name == 'feature' ? null : $router.push('/feature')"
        />
        <q-tab
          name="account"
          @click="$route.name == 'account' ? null : $router.push('/account')"
          v-if="Auth.auth"
        >
          <template v-slot:default>
            <div>
              <q-avatar size="sm">
                <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"/>
              </q-avatar>
            </div>
          </template>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      tab: this.$route.name,
      perc: 0.4
    };
  },
  computed: {
    ...mapState(["Setting",'Auth','MusicPlayer'])
  },
  mounted() {
    setInterval(()=>{
      if(this.MusicPlayer.item){
        this.$forceUpdate()
        if(((this.MusicPlayer.item.audio.currentTime/this.MusicPlayer.item.audio.duration*100)/100) >= 1) this.pause();
      }
    },500)
  },
  methods:{
    pause(){
      this.$store.commit('MusicPlayer/pause')
    },
    resume(){
      this.$store.commit('MusicPlayer/resume')
    },
    close(){
      this.$store.commit('MusicPlayer/close')
    }
  }
};
</script>
