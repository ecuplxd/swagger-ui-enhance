Vue.component('app-search', {
  name: 'search',
  template: `
<v-responsive :max-width="450" class="mr-auto mr-md-4 transition-swing">
  <v-text-field
    v-model="search"
    prepend-inner-icon="mdi-magnify"
    placeholder='搜索 API（"/" 激活搜索框）'
    dense
    flat
    hide-details
    rounded
    solo
    @blur="onBlur"
    @focus="onFocus"
    @keydown.esc="onEsc"
  ></v-text-field>
  <v-menu
    :min-width="550"
    :max-height="500"
    v-model="showResult"
    allow-overflow
    :close-on-click="false"
    :close-on-content-click="false"
    :z-index="100"
    bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        style="
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          bottom: -5px;
        "
      ></div>
    </template>
    <div class="ds-suggestions code">
      <v-list
        dense
        two-line
        subheader
        v-for="(namespace, i) in namespaces_"
        v-show="namespace.matched"
        :key="i"
      >
        <v-subheader inset class="text-subtitle-2 ml-2">
          <div style="font-size: 20px;" v-html="namespace.name"></div>
          <div v-html="namespace.description" class="text-caption ml-2"></div>
        </v-subheader>
        <v-divider class="ml-4"></v-divider>
        <v-list-item
          style="min-height: 55px;"
            class="ml-8"
            v-show="api.matched"
            :key="j"
            v-for="(api, j) in namespace.apis"
          >
          <v-list-item-avatar size="36" class="my-0 mr-2">
            <span style="font-size: 10px;" v-html="api.method"></span>
          </v-list-item-avatar>
          <v-list-item-content
            class="py-2 pl-3 ds-suggestion-item"
            style="border-left: 1px solid rgba(0, 0, 0, 0.12);"
            @click="handleSelect(i, j)"
          >
            <v-list-item-title v-html="api.rawUrl" style="font-size: 16px; font-weight: bold;"></v-list-item-title>
            <v-list-item-subtitle v-html="api.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-menu>
</v-responsive>
  `,
  props: {
    namespaces: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data: function () {
    return {
      search: '',
      showResult: false,
      tid: null,
      namespaces_: [],
      matchedCount: 0,
    };
  },
  watch: {
    search() {
      this.doSearch();
    },
  },
  methods: {
    onBlur() {},

    onEsc() {},

    onFocus() {},
    getMatched(string, type) {
      let style = 'color: #174d8c; background: rgba(143,187,237,.1);';
      if (type === 'title') {
        style =
          'padding-bottom: 2px; box-shadow: inset 0 -2px 0 0 rgba(69,142,225,.8);';
      }
      // TODO：保持原有大小写
      return string.replace(
        new RegExp(this.search, 'ig'),
        `<span class="matched" style="${style}">$&</span>`
      );
    },
    filterNamespaces() {
      let namespaces = JSON.parse(JSON.stringify(this.namespaces));
      namespaces.forEach((namespace) => {
        namespace.name = this.getMatched(namespace.name, 'title');
        namespace.description = this.getMatched(namespace.description);

        namespace.matched =
          namespace.name.includes('span') ||
          namespace.description.includes('span');

        namespace.apis.forEach((api) => {
          api.method = this.getMatched(api.method);
          api.rawUrl = this.getMatched(api.rawUrl);
          api.description = this.getMatched(api.description);
          api.matched =
            api.method.includes('span') ||
            api.rawUrl.includes('span') ||
            api.description.includes('span');
          this.matchedCount += +api.matched;
        });

        if (!namespace.matched) {
          namespace.matched = namespace.apis.some((api) => api.matched);
        }
      });
      return namespaces;
    },
    doSearch() {
      if (!this.search) {
        this.showResult = false;
        return;
      }
      if (this.tid) {
        return;
      }
      this.tid = setTimeout(() => {
        this.namespaces_ = this.filterNamespaces();
        this.showResult = this.search;
        this.tid = clearTimeout(this.tid);
      }, 500);
    },
    handleSelect(namespaceIndex, apiIndex) {
      this.showResult = false;
      this.search = '';
      this.$emit('select', namespaceIndex, apiIndex);
    },
  },
});
