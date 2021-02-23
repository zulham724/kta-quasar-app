<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-layout view="hHh Lpr fFf">
      <q-header elevated>
        <q-toolbar class="bg-white">
          <q-btn color="teal" flat dense icon="arrow_back" @click="$router.push('/')" />
          <q-toolbar-title>
            <div class="text-body2 text-teal text-bold">Conversations</div>
          </q-toolbar-title>
          <q-btn
            @click="$router.push({ name: 'userchatsearch' })"
            color="teal"
            flat
            round
            dense
            icon="chat"
          />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <q-infinite-scroll @load="onLoad" :offset="250">
            <item-component
              v-for="item in Conversation.items.data"
              :key="item.id"
              :item="item"
            ></item-component>

            <!-- <q-list bordered v-if="Conversation.items.data">
            <q-item
              v-for="item in Conversation.items.data"
              :key="item.id"
              class="q-mb-sm"
              clickable
              v-ripple
              @click="goToChat(item.id)"
            >
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
                <q-item-label caption lines="1">{{ Chat.items[`personal_conversation_${item.id}`]?Chat.items[`personal_conversation_${item.id}`].data[0]:'asu' }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="chat_bubble" color="grey" />
              </q-item-section>
            </q-item>
          </q-list> -->
          </q-infinite-scroll>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-pull-to-refresh>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["conversationId"],
  components: {
    ItemComponent: () => import("components/conversation/ItemComponent"),
  },
  props: {
    postId: null,
  },
  computed: {
    ...mapState(["Setting", "Auth", "Conversation", "Chat"]),
  },
  data() {
    return {
      post: null,
      comment: {
        value: "",
      },
      loading: false,
    };
  },
  created() {
    // fetch data pertama kali jika tidak ada prop `total`
    if (!this.Conversation.items.total) {
      this.$store.dispatch("Conversation/index").then((data) => {
        const conversation_ids = data.data.map((e) => e.id);
        // get latest messages from conversation_ids
        this.$store
          .dispatch("Chat/setLatestChatByIds", conversation_ids)
          .then((data2) => {
            this.$devLogger("latest message", data2);
          });
      });
    }

    // cek UnreadConversation jika belum ada
    if (!this.$store.getters["UnreadConversation/items"].data) {
      this.$store.dispatch("UnreadConversation/index");
    }
  },
  mounted() {
    this.$devLogger(this.conversationId);
    // this.post == null ? this.getPost() : null;
    // this.$refs.keyboard.focus()
  },
  methods: {
    createConversation() {},
    goToChat(conversation_id) {
      this.$router.push("/chat/" + conversation_id);
    },
    onLoad(index, done) {
      this.Conversation.items.next_page_url
        ? this.$store.dispatch("Conversation/next").then((data) => {
            const conversation_ids = data.data.map((e) => e.id);
            // get latest messages from conversation_ids
            this.$store
              .dispatch("Chat/setLatestChatByIds", conversation_ids)
              .then((data2) => {
                done();
                this.$devLogger("latest message...", data2);
              });
          })
        : done();
    },
    refresh(done) {
      this.$store.dispatch("Conversation/index").then((res) => {
        done();
      });
    },
  },
};
</script>

<style></style>
