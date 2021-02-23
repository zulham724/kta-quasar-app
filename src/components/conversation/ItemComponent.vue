<template>
  <q-item class="q-mb-sm" clickable v-ripple @click="goToChat(item.id)" v-if="chatItem">
    <q-item-section avatar>
      <q-avatar>
        <q-img :src="`${Setting.storageUrl}/${item.users[0].avatar}`">
          <template v-slot:loading>
            <div class="bg-grey-2" style="height: 100%; width: 100%"></div>
          </template>
        </q-img>
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ item.users[0].name }}</q-item-label>
      <q-item-label :class="isUnread?'text-weight-bold':''" caption lines="1">{{
        chatItem.data.length>0
          ? chatItem.data[chatItem.data.length-1].message.value
          : ""
      }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="chat_bubble" color="grey" />
    </q-item-section>
  </q-item>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    item: Object,
  },
  computed: {
    ...mapState(["Setting", "Auth", "Conversation", "Chat","UnreadConversation"]),
    chatItem:function(){
        return this.Chat.items[`personal_conversation_${this.item.id}`];
    },
    isUnread:function(){
      const find = this.UnreadConversation.items.data.find(e=>e.conversation_id==this.item.id);
      if(find){
        return true;
      }
      return false;
    }

  },
  data() {
    return {};
  },
  methods: {
    goToChat(conversation_id) {
      this.$router.push("/chat/" + conversation_id);
    },
  },
};
</script>
