Vue.component('app-api-type', {
  name: 'apiType',
  template: `
<div>
  <span :id="parameterID">
    <span>{{id}}</span>
    <v-menu
      v-if="refType"
      v-model="showTypeDetail"
      :open-on-hover="openOnHover"
      :close-on-click="false"
      :close-on-content-click="false"
      :nudge-width="200"
      :min-width="450"
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
            v-html="codeString"
          ></pre>
        </v-list-item>
        <v-card-actions class="d-flex justify-space-between align-center">
          <div class="d-flex">
            <v-switch
              class="mt-0 mr-4"
              v-model="removeQuestion"
              hide-details
              color="purple"
              label="Partial&lt;T&gt; 转 T"
              :disabled="showSample"
            ></v-switch>
            <v-switch
              class="mt-0"
              v-model="showSample"
              hide-details
              color="purple"
              label="示例">
            </v-switch>
          </div>
          <div>
            <v-btn class="pa-0" text @click="close">关闭（ESC）</v-btn>
            <app-api-copy
              class="pa-0"
              type="text"
              color="primary"
              @copy="close"
              :target="typeID"
            >复制</app-api-copy>
          </div>
        </v-card-actions>
      </v-card>
    </v-menu>
  </span>
  <app-api-copy
    v-if="id"
    :target="parameterID"
    style="margin-left: -12px;"
  ></app-api-copy>
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
    codeString() {
      if (this.showSample) {
        return this.code.mock;
      }
      return this.removeQuestion ? this.code.noQuestion : this.code.raw;
    },
  },
  data() {
    return {
      type: '',
      refType: false,
      showTypeDetail: false,
      removeQuestion: false,
      showSample: false,
      openOnHover: true,
      code: {
        raw: '',
        noQuestion: '',
        mock: '',
      },
      typeID: this.genID(),
      parameterID: this.genID(),
    };
  },
  watch: {
    showTypeDetail(show) {
      this.openOnHover = !show;
      if (show && !this.code.raw) {
        const types = this.$root.types;
        this.code.raw = TypeHelper.getExports(this.type, types);
      }
    },
    removeQuestion(remove) {
      if (remove && !this.code.noQuestion) {
        this.code.noQuestion = this.code.raw.replace(/\?/gi, '');
      }
    },
    showSample(show) {
      if (show && !this.code.mock) {
        this.code.mock = this.genMock();
      }
    },
  },
  mounted() {
    const type = new TypeHelper(this.parameter);
    this.type = type.type;
    this.refType = type.refType;
    this.listenerKey(27, this.close);
  },
  methods: {
    // TODO
    genMock() {
      return '';
    },
    close() {
      this.showTypeDetail = false;
    },
  },
});
