import axios from "axios";
const chatOperation  = require("../../lib/chatOperation");
const actions = {
  index({ commit }) {
    return new Promise(resolve => {
      //axios.get()
    });
  },
  setLatestChatByIds({ state, commit }, conversation_ids) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.state.Setting.chatUrl}/getlatestchat`, {
          conversation_ids: conversation_ids
        })
        .then(res => {
          res.data.forEach(conversation => {
            // this._vm.$devLogger('conversationState', conversationState);
            const key = "personal_conversation_" + conversation.id;
            this._vm.$devLogger("set chats for", key);
            const chats_count = conversation.chats.data.length;

            // BEGIN list senders
            const sender_list = [];
            conversation.chats.data.forEach(chat => {
              if (sender_list.indexOf(chat.sender_id) == -1) {
                sender_list.push(chat.sender_id);
              }
            });
            const detail_sender_obj = {};
            sender_list.forEach(sender_id => {
              detail_sender_obj["sender_" + sender_id] = state.items[
                key
              ].participants.find(e => e.id == sender_id);
            });
            // END list sender

            this._vm.$devLogger(
              "sender list from conversation_id",
              conversation.id,
              ":",
              sender_list
            );

            // mutasi data
            const message_list = [];
            for (let i = chats_count - 1; i >= 0; i--) {
              let chat = conversation.chats.data[i];
              const senderObj = detail_sender_obj["sender_" + chat.sender_id];
              if (senderObj) {
                const data = {
                  message: {
                    value: chat.value,
                    id: chat.id
                  },
                  user: {
                    id: senderObj.id,
                    name: senderObj.name,
                    avatar: senderObj.avatar
                  },
                  read_at: chat.read_at
                };
                message_list.push(data);
              }
            }

            // const message_list = chatOperation({state_items:state.items, conversation:conversation})
            commit("addBulk", {
              conversation_id: conversation.id,
              data: message_list
            });
            commit("setNextUrl", {
              conversation_id: conversation.id,
              next_page_url: conversation.chats.next_page_url
            });
            commit("setPrevUrl", {
              conversation_id: conversation.id,
              prev_page_url: conversation.chats.prev_page_url
            });
          });

          // commit("setChatByIds", {chats:res.data});
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nextPage({ commit, state }, { conversation_id }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      const key = "personal_conversation_" + conversation_id;
      axios
        .post(`${state.items[key].next_page_url}`, {
          conversation_ids: [conversation_id]
        })
        .then(res => {
          // commit("next", { posts: res.data });
          const conversation = res.data[0];

          const chats_count = conversation.chats.data.length;

          // BEGIN list senders
          const sender_list = [];
          conversation.chats.data.forEach(chat => {
            if (sender_list.indexOf(chat.sender_id) == -1) {
              sender_list.push(chat.sender_id);
            }
          });
          const detail_sender_obj = {};
          sender_list.forEach(sender_id => {
            detail_sender_obj["sender_" + sender_id] = state.items[
              key
            ].participants.find(e => e.id == sender_id);
          });
          // END list sender

          this._vm.$devLogger(
            "sender list from conversation_id",
            conversation.id,
            ":",
            sender_list
          );

          // mutasi data
          const message_list = [];
          for (let i = chats_count - 1; i >= 0; i--) {
            let chat = conversation.chats.data[i];
            const senderObj = detail_sender_obj["sender_" + chat.sender_id];
            if (senderObj) {
              const data = {
                message: {
                  value: chat.value,
                  id: chat.id
                },
                user: {
                  id: senderObj.id,
                  name: senderObj.name,
                  avatar: senderObj.avatar
                },
                read_at: chat.read_at
              };
              message_list.push(data);
            }
          }

          commit("addBulk", {
            conversation_id: conversation.id,
            data: message_list
          });

          commit("setNextUrl", {
            conversation_id: conversation.id,
            next_page_url: conversation.chats.next_page_url
          });
          commit("setPrevUrl", {
            conversation_id: conversation.id,
            prev_page_url: conversation.chats.prev_page_url
          });
          resolve(res.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getUnreadCount({ state, commit }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${this.state.Setting.chatUrl}/getunreadcount`)
        .then(res => {
          commit("setUnreadCount", { unread_count: res.data.unread_count });
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default actions;
