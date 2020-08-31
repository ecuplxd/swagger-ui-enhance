Vue.component('app-api-item', {
  name: 'apiItem',
  template: `
<div>
  <v-chip
    v-if="!short"
    small
    label
    style="flex-shrink: 0; flex: initial"
    :color="colors[api.method]"
    class="white--text"
  >
    <span class="text-center" style="min-width: 40px;">{{api.method}}</span>
  </v-chip>
  <span v-if="!short" class="mx-1">{{copy ? api.url : api.rawUrl }}</span>
  <app-api-copy v-if="copy" :clipboard-text="api.url" text="复制 URL"></app-api-copy>
  <span class="mr-1">{{api.description}}</span>
  <app-api-copy v-if="copy" :clipboard-text="api.description" text="复制描述"></app-api-copy>
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
    return {};
  },
});
