Vue.component('app-api-search', {
  name: 'apiSearch',
  template: `
<v-responsive :max-width="450" class="mr-auto mr-md-4 transition-swing">
  <v-text-field
    v-model="search"
    prepend-inner-icon="mdi-magnify"
    placeholder='搜索 API（"/" 激活，"↑" "↓" 切换，"→/回车" 选择）'
    dense
    flat
    hide-details
    rounded
    solo
    ref="searchEl"
    @blur="onBlur"
    @focus="onFocus"
    @keydown.esc="onEsc"
  ></v-text-field>
  <v-menu
    :min-width="550"
    :max-height="500"
    v-model="showResult"
    allow-overflow
    :close-on-content-click="false"
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
        <v-subheader inset class="text-subtitle-2 ml-2 code">
          <div style="font-size: 20px;" v-html="namespace.name"></div>
          <div v-html="namespace.description" class="text-caption ml-2"></div>
        </v-subheader>
        <v-divider class="ml-4"></v-divider>
        <v-list-item
          style="
            min-height: 55px;
          "
          class="ml-8 pl-4"
          v-show="api.matched"
          :key="j"
          v-for="(api, j) in namespace.apis"
        >
          <v-list-item-avatar size="40" class="my-0 mr-2">
            <span style="font-size: 10px;" v-html="api.method"></span>
          </v-list-item-avatar>
          <v-list-item-content
            class="py-2 pl-3 ds-suggestion-item"
            style="border-left: 1px solid rgba(0, 0, 0, 0.12);"
            :class="{actived: api.index_ === activedSearchIndex}"
            :data-namespace="i"
            :data-api="j"
            @click="handleSelect(i, j)"
          >
            <v-list-item-title v-html="api.rawUrl" style="font-size: 16px;"></v-list-item-title>
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
      activedSearchIndex: 0,
      matchedElClass: '.ds-suggestion-item.actived',
    };
  },
  watch: {
    search() {
      this.doSearch();
    },
  },
  methods: {
    onBlur() {
      // Trick: 当鼠标点击结果项，首先触发完 blur 会执行 reset 导致元素被隐藏，handleSelect 无法执行
      // setTimeout(() => {
      //   this.reset();
      // }, 500);
    },
    onEsc() {
      this.$refs.searchEl.blur();
    },
    onFocus() {
      this.doSearch();
    },
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
      namespaces.forEach((namespace, i) => {
        namespace.name = this.getMatched(namespace.name, 'title');
        namespace.description = this.getMatched(namespace.description);

        namespace.matched =
          namespace.name.includes('span') ||
          namespace.description.includes('span');

        namespace.apis.forEach((api, j) => {
          api.method = this.getMatched(api.method);
          api.rawUrl = this.getMatched(api.rawUrl);
          api.description = this.getMatched(api.description);

          api.matched =
            api.method.includes('span') ||
            api.rawUrl.includes('span') ||
            api.description.includes('span');
          api.index_ = api.matched ? this.matchedCount++ : -1;
        });

        if (!namespace.matched) {
          namespace.matched = namespace.apis.some((api) => api.matched);
        }
      });
      return namespaces;
    },
    doSearch() {
      if (!this.search) {
        this.reset();
        return;
      }
      if (this.tid) {
        return;
      }
      this.tid = setTimeout(() => {
        this.reset();
        this.namespaces_ = this.filterNamespaces();
        this.showResult = !!this.matchedCount;
        this.tid = clearTimeout(this.tid);
      }, 500);
    },
    handleSelect(namespaceIndex, apiIndex) {
      this.$emit('select', namespaceIndex, apiIndex, true);
      this.reset(true);
    },
    reset(resetSearch) {
      this.activedSearchIndex = 0;
      this.matchedCount = 0;
      this.search = resetSearch ? '' : this.search;
      this.showResult = false;
    },
    updateActivedSearchIndex(dir) {
      const delta = dir === 'up' ? -1 : 1;
      const index = (this.activedSearchIndex + delta) % this.matchedCount;
      this.activedSearchIndex = index > -1 ? index : this.matchedCount - 1;
      this.scrollToActivedItem();
    },
    scrollToActivedItem() {
      this.$nextTick(() => {
        const el = document.querySelector(this.matchedElClass);
        el.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest',
        });
      });
    },
    selectActivedItem() {
      if (this.showResult) {
        const el = document.querySelector(this.matchedElClass);
        if (!el) {
          return;
        }
        const namespaceIndex = +el.getAttribute('data-namespace');
        const apiIndex = +el.getAttribute('data-api');
        this.handleSelect(namespaceIndex, apiIndex);
      }
    },
  },
  mounted() {
    this.listenerKey(191, () => this.$refs.searchEl.focus());
    this.listenerKey(38, () => this.updateActivedSearchIndex('up'));
    this.listenerKey(40, () => this.updateActivedSearchIndex('down'));
    // 右方向键
    this.listenerKey(39, () => this.selectActivedItem());
    // 回车
    this.listenerKey(13, () => this.selectActivedItem());
  },
});
