<template>
  <div class="home">
    <ul class="message-list" ref="chatList">
      <li v-for="(item, index) in messageList" :key="index">
        {{item}}
      </li>
    </ul>

    <form class="message-box">
      <textarea name="message" rows="3" cols="80" v-model="messageContent" />
      <button @click="sendMessage">Send</button>
    </form>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'Home',
  data() {
    return {
      messageContent: '',
      messageList: [
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '123',
        '1---------------1'
      ],

      // eslint-disable-next-line
      _socket: null, // 不会被 Vue 实例代理
    }
  },
  mounted() {
    // console.log(io);
    this.init();
  },
  beforeDestroy() {
    this._socket = null;
  },
  methods: {
    init() {
      /**
       * 切换路由，再次发送消息，"chat message"会触发两次。
       * 这是因为切换路由和刷新页面原理相同，socket.io又注册了一个新的用户，当广播发送消息时，接收了两次。猜测的原因！
       */
      const socket = io('http://localhost:3000');
      console.log('socket', socket);

      socket.on('chat message', (msg) => {
        console.log('msg', msg);

        this.messageList.push(msg);
        // window.scrollTo(0, document.body.scrollHeight);
        this.$nextTick(() => {
          const chatListEl = this.$refs.chatList;
          chatListEl.scrollTo(0, chatListEl.scrollHeight);
        });
      });

      this._socket = socket;
    },
    sendMessage(event) {
      console.log('send', event);
      event.preventDefault();

      if (this.messageContent) {
        this._socket.emit('chat message', this.messageContent);
        this.messageContent = '';
      }
    },
  },
}
</script>

 <style lang="scss" scoped>
.home {
  height: 520px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}
.message-list {
  flex: 1;
  padding-left: 30px;
  list-style: disc;
  overflow-x: hidden;
  overflow-y: auto;
  > li {
    height: 30px;
    line-height: 30px;
  }
}
.message-box {
  display: flex;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-top: 1px solid #ccc;
  > textarea {
    flex: 1;
    border: 0;
  }
  > button {
    width: 100px;
  }
}
 </style>
