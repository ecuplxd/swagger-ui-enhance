Vue.component('app-api-namespace', {
  name: 'apiNamespace',
  template: `
<v-list>
  <v-list-item-group
    mandatory
    color="indigo"
    v-model="activedIndex_"
    @change="handleChange"
  >
    <v-menu
      v-for="(namespace, i) in namespaces"
      v-model="values[i]"
      :key="i"
      offset-x
      open-on-hover
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item link class="pr-0" v-show="namespace.matched">
          <v-list-item-content>
            <v-list-item-title>{{ namespace.name }} </v-list-item-title>
            <v-list-item-subtitle>
              {{ namespace.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="pr-4" v-bind="attrs" v-on="on">
            <v-icon x-small color="lighten-1">mdi-more</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="(api, index) in namespace.apis"
            :key="index"
            @click="goTo(i, index)"
          >
            <app-api-item :api="api" :copy="false"></app-api-item>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-list-item-group>
</v-list>
  `,
  model: {
    prop: 'activedIndex',
    event: 'change',
  },
  props: {
    namespaces: {
      type: Array,
      default() {
        return [];
      },
    },
    activedIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  watch: {
    activedIndex(newIndex) {
      this.activedIndex_ = newIndex;
    },
  },
  data() {
    return {
      activedIndex_: this.activedIndex,
      values: Array(this.namespaces.length).fill(false),
    };
  },
  methods: {
    handleChange(activedIndex) {
      this.$emit('change', activedIndex);
      this.goTo(activedIndex, 0);
    },
    goTo(activedIndex, apiIndex) {
      this.activedIndex_ = activedIndex;
      this.$emit('select', activedIndex, apiIndex);
    },
  },
});
