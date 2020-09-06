Vue.component('app-api-item', {
  name: 'apiItem',
  template: `
<div>
  <v-btn
    v-if="!short"
    small
    tile
    depressed
    min-width="60"
    height="25"
    :color="colors[api.method]"
    class="px-0 white--text code"
  >
    {{api.method}}
  </v-btn>
  <span
    v-if="!short"
    class="mx-1 v-list-item__title code"
    style="font-size: 16px;"
  >{{copy ? api.url : api.rawUrl }}</span>
  <app-api-copy
    v-if="copy"
    style="margin-left: -12px;"
    :clipboard-text="api.url"
    text="复制 URL"
  ></app-api-copy>
  <span
    class="font-weight-regular break-word v-list-item__subtitle"
    :style="style"
  >{{api.description}}</span>
  <app-api-copy
    v-if="copy"
    :clipboard-text="api.description"
    text="复制描述"
  ></app-api-copy>
</div>
  `,
  props: {
    api: {
      type: Object,
      default() {
        return {};
      },
    },
    short: {
      type: Boolean,
      default() {
        return false;
      },
    },
    copy: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      style: {
        color: this.short ? '' : 'rgba(0, 0, 0, 0.6)',
      },
    };
  },
});
