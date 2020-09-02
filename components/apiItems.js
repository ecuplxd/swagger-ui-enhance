Vue.component('app-api-items', {
  name: 'apiItems',
  template: `
<div>
  <div class="text-right pb-4">
    <v-btn @click="all" tile outlined class="mr-2" color="primary">展开全部</v-btn>
    <v-btn @click="none" tile outlined class="mr-2" color="primary">收起全部</v-btn>
  </div>
  <v-expansion-panels flat multiple v-model="panel">
    <v-expansion-panel
      v-for="(api, i) in apis"
      class="mb-2"
      :class="api.method"
      :id="'api-item-' + i"
      :key="i"
      :style="'border: 1px solid ' + colors[api.method]"
    >
      <v-expansion-panel-header class="py-2 px-4">
        <app-api-item :api="api"></app-api-item>
      </v-expansion-panel-header>
      <v-expansion-panel-content :style="'border-top: 1px solid ' + colors[api.method]">
        <v-row align="start" justify="start">
          <v-col cols="6" class="px-0 pb-0">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-space-between align-center text--primary font-weight-bold">
                    <span i18n-text>请求参数</span>
                    <v-btn small outlined i18n-text>发起请求</v-btn>
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
  },
  watch: {
    apis(newValue) {
      // Note: for debug
      // this.all();
    },
    activedIndex(newIndex) {
      this.expandedApi(newIndex);
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
  },
});
