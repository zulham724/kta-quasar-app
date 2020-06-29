<template>
  <div>
    <q-item v-if="item" clickable @click="play()">
      <q-item-section>
        <q-item-label lines="3">{{ item.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props:{
    item: null
  },
  methods:{
    play(){
      this.$store.commit('MusicPlayer/play',{item:this.item})
    }
  }
}
</script>

<style>

</style>
