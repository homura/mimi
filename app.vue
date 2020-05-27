<template>
  <div>
    <div class="box">
      <div class="field">
        <label class="label">Display</label>
        <div class="control">
          <input v-model="display" class="input" type="text" placeholder="Display">
        </div>
      </div>

      <div class="field">
        <label class="label">Secret</label>
        <div class="control">
          <input v-model="secret" class="input" type="text" placeholder="Secret">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="encode" class="button is-link">Encode and copy</button>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="field">
        <label class="label">Encoded</label>
        <div class="control">
          <input v-model="encoded" class="input" type="text" placeholder="Encoded">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="decode" class="button is-link">Decode</button>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            disabled
            placeholder="Primary textarea"
            v-model="decoded">
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { copyTextToClipboard } from "./clipboard";
  import { encode, decode } from './codec';

  export default Vue.extend({
    data() {
      return {
        display: 'hello',
        secret: '你好',

        encoded: '',
        decoded: '',
      };
    },
    methods: {
      async encode() {
        try {
          await copyTextToClipboard(encode(this.display, this.secret));
          alert('copied to clipboard');
        } catch (e) {
          alert(e.message);
        }
      },
      decode() {
        try {
          this.decoded = decode(this.encoded);
        } catch (e) {
          alert(e.message);
        }
      }
    }

  })
</script>