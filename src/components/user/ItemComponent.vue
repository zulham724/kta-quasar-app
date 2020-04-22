<template>
  <div>
    <q-item clickable v-ripple v-if="user != null" @click="$router.push(`/user/profile/${user.id}`)">
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="`${Setting.storageUrl}/${user.avatar}`" width="15vw" no-default-spinner />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="3">{{ user.name }}</q-item-label>
        <q-item-label caption lines="2">{{ user.email }}</q-item-label>
      </q-item-section>

    </q-item>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    user: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {

  }
};
</script>

<style></style>
