Vue.component('app-api-description', {
  name: 'apiDescription',
  template: `
<div class="pa-3">
  <v-menu
    bottom
    left
    offset-y
    max-height="calc(100% - 16px)"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="text-capitalize hidden-xs-only pl-0"
        text
        v-bind="attrs"
        v-on="on"
        title="点击切换 API 集"
      >
        <span
          class="subtitle-1 text-capitalize font-weight-light hidden-sm-and-down"
          v-text="info.title"
        />
        <span class="text--disabled">{{info.version}}</span>
        <v-icon class="hidden-sm-and-down" right> mdi-menu-down </v-icon>
      </v-btn>
    </template>

    <v-list dense nav>
      <template v-for="(project, i) in projects">
        <v-list-item :key="i" @click="selecProject(project, i)">
          <v-list-item-title v-text="project.info.title + ' ' + project.info.version" />
        </v-list-item>
      </template>
    </v-list>
  </v-menu>

  <div class="text-caption">[ Base URL: {{shortUrl}} ]</div>
  <div>
    <a class="text-decoration-none" target="_blank" :href="url" :title="url" style="font-size: 14px;">
      <span>swagger.json</span>
      <v-icon x-small color="primary">mdi-open-in-new</v-icon>
    </a>
  </div>
</div>
  `,
  props: {
    info: {
      type: Object,
      default() {
        return {
          description: '',
          version: '',
          title: '',
          host: '',
          basePath: '',
        };
      },
    },
    projects: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    shortUrl() {
      return `${this.info.host}${this.info.basePath}`;
    },
    url() {
      return `https://${this.shortUrl}/swagger.json`;
    },
  },
  data: function () {
    return {};
  },
  methods: {
    selecProject(project, index) {
      if (project.id === this.info.id) {
        return;
      }
      this.$emit('select', index);
    },
  },
});
