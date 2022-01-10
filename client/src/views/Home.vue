<template>
  <div class="home">
    <ul id="messages"></ul>

    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'Home',
  mounted() {
    // console.log(io);
    this.init();
  },
  methods: {
    init() {
      const socket = io('http://localhost:3000/ws');
      console.log('socket', socket);

      socket.on('chat message', function(msg) {
        console.log('msg', msg);
        // var item = document.createElement('li');
        // item.textContent = msg;
        // messages.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
      });
    },
  },
}
</script>
