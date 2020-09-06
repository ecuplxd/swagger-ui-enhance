Vue.component('app-api-import', {
  name: 'apiImport',
  template: `
<div class="ml-4">
  <v-text-field
    v-if="byUrl"
    placeholder="通过 URL 导入已有 API"
    dense
    flat
    hide-details
    solo
    outlined
    single-line
    v-model="url"
    style="min-width: 400px;"
    type="url"
    @keydown.enter="fetchFile"
    required
  ></v-text-field>
  <v-btn
    v-if="byLocal"
    absolute
    fab
    dark
    x-small
    color="blue darken-2"
    right
    title="点击导入本地 JSON 文件"
    style="
      top: 65px;
    "
  >    
    <v-file-input
      dense
      flat
      hide-details
      hide-input
      prepend-icon="mdi-plus"
      accept="application/json"
      @change="parseFile"
      style="
        position: relative;
        left: 4.5px;
        bottom: 2px;
      "
    ></v-file-input>
  </v-btn>
  <v-dialog
    v-model="hadError"
    max-width="290"
  >
    <v-card>
      <v-card-title>导入失败</v-card-title>
      <v-card-text class="code">{{error}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
  `,
  props: {
    byUrl: {
      type: Boolean,
      default() {
        return true;
      },
    },
    byLocal: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      hadError: false,
      error: {},
      url: '',
      urlReg: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
    };
  },
  methods: {
    showError(error) {
      this.hadError = true;
      this.error = error;
    },
    emitSuccess(config) {
      this.hadError = false;
      this.$emit('success', config);
    },
    parseFile(file) {
      const blob = file.slice();
      blob.text().then((text) => {
        try {
          this.emitSuccess(JSON.parse(text));
        } catch (error) {
          this.showError(error);
        }
      });
    },
    fetchFile() {
      if (!this.urlReg.test(this.url)) {
        return;
      }
      fetch(this.url)
        .then((res) => res.json())
        .then((config) => {
          this.emitSuccess(config);
        })
        .catch((error) => this.showError(error));
    },
  },
});
