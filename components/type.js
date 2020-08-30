Vue.component('app-api-type', {
  name: 'apiType',
  template: `
<div>
  <span>{{id}}</span>
  <v-menu
    v-if="refType"
    open-on-hover
    v-model="showTypeDetail"
    :close-on-content-click="false"
    :nudge-width="200"
    :min-width="400"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on">{{type}}</a>
    </template>
    <v-card>
      <v-list-item class="pa-0">
        <pre
          ref="code"
          class="code pa-4"
          style="background: rgb(51, 51, 51); color: #fff; width: 100%;"
          :data-code="exportText"
          v-html="exportText"
        ></pre>
      </v-list-item>
      <v-card-actions class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-switch v-model="removeQuestion" color="purple"></v-switch>
          <span>移除 Partial&lt;T&gt;</span>
        </div>
        <div>
          <v-btn text @click="showTypeDetail = false">关闭</v-btn>
          <app-api-copy type="text" color="primary" @click="menu = false">复制</app-api-copy>
        </div>
      </v-card-actions>
    </v-card>
  </v-menu>
  <v-icon
    v-if="refType"
    class="pointer"
    title="查看 Sample Value"
    x-small
  >mdi-more</v-icon>
</div>
`,
  props: {
    parameter: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    id() {
      if (this.parameter.display) {
        return (
          this.parameter.display +
          (this.type ? ': ' + (this.refType ? '' : this.type) : '')
        );
      }
      return '';
    },
  },
  data() {
    return {
      type: '',
      refType: false,
      showTypeDetail: false,
      exportText: '',
      removeQuestion: false,
    };
  },
  watch: {
    showTypeDetail(show) {
      if (show) {
        const types = this.$root.types;
        this.exportText = TypeHelper.getExports(this.type, types);
      }
    },
    removeQuestion(remove) {
      const code = this.$refs.code;
      const text = code.getAttribute('data-code');
      if (remove) {
        code.innerHTML = text.replace(/\?/gi, '');
      } else {
        code.innerHTML = text;
      }
    },
  },
  mounted() {
    const type = new TypeHelper(this.parameter);
    this.type = type.type;
    this.refType = type.refType;
  },
  methods: {},
});
