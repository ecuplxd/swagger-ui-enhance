Vue.component('app-api-toc', {
  name: 'apiToc',
  template: `
<v-navigation-drawer
  app
  permanent
  right
  style="
    height: 100vh;
    top: 64px;
    transform: translateX(0%);
    width: 256px;
    max-height: calc(100% - 64px);
  "
>
  <ul class="pt-8 mb-6 api-toc">
    <li class="mb-4">
      <h3 class="caption font-weight-bold grey--text">
        {{namespace && namespace.name}}
      </h3>
    </li>
    <template v-if="namespace">
      <li
        v-for="(api, i) in namespace.apis"
        :class="{
          'mb-2': i + 1 !== namespace.apis.length,
          'primary--text': activedIndex_ === i,
          'text--disabled': activedIndex_ !== i
        }"
        :style="{
          borderColor: activedIndex_ === i ? 'currentColor' : undefined
        }"
      >
        <a
          :href="'#api-item-' + i"
          class="d-block font-weight-medium"
          @click.stop.prevent="goTo(i)"
        >
          <app-api-item :api="api" short :copy="false"></app-api-item>
        </a>
      </li>
    </template>
  </ul>
</v-navigation-drawer>
  `,
  model: {
    prop: 'activedIndex',
    event: 'change',
  },
  props: {
    namespace: {
      type: Object,
      default() {
        return {};
      },
    },
    activedIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  watch: {
    activedIndex(newIndex) {
      this.goTo(newIndex);
    },
  },
  data() {
    return {
      activedIndex_: this.activedIndex,
    };
  },
  methods: {
    goTo(index) {
      this.activedIndex_ = index;
      const id = 'api-item-' + index;
      if (document.getElementById(id)) {
        this.$vuetify.goTo('#' + id);
        this.$emit('change', index);
      }
    },
  },
});
