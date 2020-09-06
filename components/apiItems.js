Vue.component('app-api-items', {
  name: 'apiItems',
  template: `
<div>
  <div class="text-right pb-4">
    <v-btn @click="all" tile outlined class="mr-2" color="primary">展开全部</v-btn>
    <v-btn @click="none" tile outlined class="mr-2" color="primary">收起全部</v-btn>
  </div>
  <v-expansion-panels flat multiple :value="panel">
    <v-expansion-panel
      v-for="(api, i) in apis"
      class="mb-2"
      :class="api.method"
      :id="'api-item-' + i"
      :key="i"
      :style="'border: 1px solid ' + colors[api.method]"
    >
      <v-expansion-panel-header class="py-2 px-4" @click="indexChange(i)">
        <app-api-item :api="api"></app-api-item>
      </v-expansion-panel-header>
      <v-expansion-panel-content :style="'border-top: 1px solid ' + colors[api.method]">
        <v-row align="start" justify="start">
          <v-col cols="6" class="px-0 pb-0">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="d-flex justify-space-between align-center font-weight-medium"
                  >
                    <span i18n-text>请求参数</span>
                    <span>
                      <v-btn small tile outlined i18n-text color="primary">
                        发起请求
                      </v-btn>
                      <v-btn
                        small
                        tile
                        outlined
                        color="primary"
                        class="pa-0"
                        min-width="24"
                        title="历史记录"
                        style="
                          border-left: 0;
                          margin-left: -4px;
                        "
                      >
                        <v-icon size="16">mdi-history</v-icon>
                      </v-btn>
                    </span>
                  </v-list-item-title>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">字段名</th>
                          <th class="text-left">描述</th>
                        </tr>
                      </thead>
                      <tbody class="code">
                        <tr
                          v-for="parameter in api.parameters"
                          :key="parameter.name"
                        >
                          <td style="width: 50%;">
                            <app-api-type :parameter="parameter"></app-api-type>
                            <div class="text--disabled" style="line-height: initial;">({{ parameter.in }})</div>
                          </td>
                          <td>
                            <div>{{ parameter.description}}</div>
                          </td>
                        </tr>
                        <tr v-if="!api.parameters || api.parameters.length === 0">
                          <td class="text-center text--disabled" colspan="2" i18n-text>没有参数</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="6" class="pr-0">
            <app-api-response
              :responses="api.responses"
              :produces="api.produces"
              :produce="api.produce"
            ></app-api-response>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
  `,
  props: {
    apis: {
      type: Array,
      default() {
        return [];
      },
    },
    activedIndex: {
      type: Number,
    },
    forceSelect: {
      type: Number,
    },
  },
  watch: {
    apis(newValue) {
      // Note: for debug
      // this.all();
    },
    activedIndex(newIndex) {
      this.expandedApi(newIndex);
    },
    forceSelect() {
      this.expandedApi(this.activedIndex);
    },
  },
  data: function () {
    return {
      panel: [],
    };
  },
  methods: {
    all() {
      this.panel = this.apis.map((api, i) => i);
    },
    none() {
      this.panel = [];
    },
    expandedApi(index) {
      let panel = Array(this.apis.length).fill(-1);
      panel[index] = index;
      this.panel = panel;
    },
    indexChange(index) {
      this.$emit('index-change', index);
    },
  },
});
