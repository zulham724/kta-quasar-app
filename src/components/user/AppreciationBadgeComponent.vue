<template>
  <div>
    <q-badge :color="colors[(item.level-1)%colors.length]" v-for="(item, i) in items" :key="i" class="q-mr-xs">
      {{item.name}}
    </q-badge>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  },
  data(){
      return{
          colors:[
          'grey-6',
          'brown-6',
          'blue-grey-6',
          'orange-6',
          'light-green-6',
          'green-6',
          'teal-6',
          'cyan-6',
          'light-blue-6',
          'blue-6',
          'indigo-6',
          'pink-6',
          'red-6'
        ] 
      }
      
  }
};
</script>
