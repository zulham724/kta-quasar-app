<template>
  <div>
    <q-item :disable="isDisabled" clickable v-ripple v-if="user != null" @click="createConversation(user.id)">
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
    user: null,
    isDisabled:false
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    createConversation(invited_user_id){
      this.$emit('setDisabled',true);
      this.$store.dispatch("Conversation/create",{invited_user_id:invited_user_id}).then(res=>{
        this.$router.push(`/chat/${res.data.id}`);
        this.$store.commit('Conversation/add',{item:res.data});
         this.$emit('setDisabled',false);
      })
    }
  }
};
</script>

<style></style>
