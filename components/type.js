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
    :min-width="430"
    offset-y
  content-class="overflow-hidden"
  >
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on">{{type}}</a>
    </template>
    <v-card>
      <v-list-item class="pa-0">
        <pre
          :id="typeID"
          class="code pa-4"
          style="
            width: 100%;
            max-height: 550px;
            background: rgb(51, 51, 51);
            color: #fff;
            overflow-y: auto;
          "
          v-html="code"
        ></pre>
      </v-list-item>
      <v-card-actions class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-switch v-model="removeQuestion" color="purple"></v-switch>
          <span>Partial&lt;T&gt; 转为 T</span>
        </div>
        <div>
          <v-btn text @click="showTypeDetail = false">关闭</v-btn>
          <app-api-copy
            type="text"
            color="primary"
            @click="menu = false"
            :target="typeID"
          >复制</app-api-copy>
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
    code() {
      return this.removeQuestion ? this.noQuestionModelCode : this.modelCode;
    },
  },
  data() {
    return {
      type: '',
      refType: false,
      showTypeDetail: false,
      removeQuestion: false,
      modelCode: '',
      noQuestionModelCode: '',
      typeID: this.genID(),
    };
  },
  watch: {
    showTypeDetail(show) {
      if (show && !this.modelCode) {
        const types = this.$root.types;
        this.modelCode = TypeHelper.getExports(this.type, types);
      }
    },
    removeQuestion(remove) {
      if (remove && !this.noQuestionModelCode) {
        this.noQuestionModelCode = this.modelCode.replace(/\?/gi, '');
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
