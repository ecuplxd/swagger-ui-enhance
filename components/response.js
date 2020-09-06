Vue.component('app-api-response', {
  name: 'apiResponse',
  template: `
<v-card outlined>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title
        class="d-flex justify-space-between align-center font-weight-medium"
      >
        <span i18n-text>响应体</span>
        <v-select
          dense
          style="
            max-width: 160px;
            margin: 0 0 2px 0;
            position: relative;
            bottom: 4px;
          "
          class="font-weight-regular"
          v-model="produce_"
          hide-details
          :items="produces"
        >
        </v-select>
      </v-list-item-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">响应码</th>
              <th class="text-left">结果</th>
              <th class="text-left">描述</th>
            </tr>
          </thead>
          <tbody class="code">
            <template v-for="(response, name) in responses">
              <tr :key="name">
                <td style="min-width: 70px;">
                  <div>{{ name }}</div>
                </td>
                <td>
                  <app-api-type :parameter="response"></app-api-type>
                </td>
                <td>
                  <div>{{ response.description }}</div>
                </td>
              </tr>
              <tr v-if="response.headers" class="no-hover">
                <td colspan="3">
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th class="text-left">响应头</th>
                        <th class="text-left">描述</th>
                        <th class="text-left">类型</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, header) in response.headers" :key="header">
                        <td style="min-width: 150px">
                          <div>{{ header }}</div>
                        </td>
                        <td>
                          <div>{{ response.description }}</div>
                        </td>
                        <td>
                          <div>{{ TYPE_MAP[value.type] }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-list-item-content>
  </v-list-item>
</v-card>
  `,
  props: {
    responses: {
      type: Object,
      default() {
        return {};
      },
    },
    produce: {
      type: String,
      default() {
        return 'application/json';
      },
    },
    produces: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      produce_: this.produce,
    };
  },
  methods: {},
});
