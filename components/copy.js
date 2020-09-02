Vue.component('app-api-copy', {
  name: 'apiCopy',
  template: `
<v-btn
  :color="color"
  :text="!isIcon"
  :icon="isIcon"
  @click.stop.prevent="copy"
  height="24"
  width="24"
>
  <v-icon
    :title="text"
    v-if="isIcon"
    i18n-title
    x-small
    class="v-icon notranslate mdi mdi-content-copy"
  >mdi-content-copy</v-icon>
  <slot v-if="!isIcon"></slot>
</v-btn>
    `,
  props: {
    text: {
      type: String,
      default() {
        return '复制';
      },
    },
    short: {
      type: Boolean,
      default() {
        return false;
      },
    },
    color: {
      type: String,
      default() {
        return 'default';
      },
    },
    type: {
      type: String,
      default() {
        return 'icon';
      },
    },
    clipboardText: {
      type: String,
    },
    target: {
      type: String,
    },
  },
  computed: {
    isIcon() {
      return this.type === 'icon';
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    copy() {
      this.copyToClip();
      this.$root.copySuccess = true;
    },
    copyToClip() {
      const el = document.createElement('textarea');
      const value =
        this.clipboardText || document.getElementById(this.target).innerText;
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.style.display = 'none';
      document.body.removeChild(el);
      this.$emit('copy');
    },
  },
});
