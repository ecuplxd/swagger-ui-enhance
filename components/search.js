Vue.component('app-search', {
  name: 'search',
  template: `
<v-responsive :max-width="350" class="mr-auto mr-md-4 transition-swing">
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
</v-responsive>
`,
  data: function () {
    return {
      search: '',
    };
  },
  methods: {
    onBlur() {},

    onEsc() {},

    onFocus() {},
  },
});
