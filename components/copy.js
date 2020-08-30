Vue.component('app-api-copy', {
  name: 'apiCopy',
  template: `
<v-tooltip v-model="show" top :open-on-hover="false">
  <template v-slot:activator="{ on, attrs }">
    <v-btn
      :color="color"
      :text="!isIcon"
      :icon="isIcon"
      v-bind="attrs"
      v-on="on"
    >
      <v-icon
        :title="text"
        v-if="isIcon"
        i18n-title
        x-small
        class="v-icon notranslate mdi mdi-content-copy"
        @click.stop.prevent="copy"
      >mdi-content-copy</v-icon>
      <slot v-if="!isIcon"></slot>
    </v-btn>
  </template>
  <span i18n-text>已复制</span>
</v-tooltip>
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
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
  },
});
