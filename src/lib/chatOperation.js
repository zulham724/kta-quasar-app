module.exports = function({state_items, conversation}) {
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
    detail_sender_obj["sender_" + sender_id] = state_items[
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
  return { message_list };
};
