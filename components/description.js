Vue.component('app-api-description', {
  name: 'apiDescription',
  template: `
<div class="pa-3">
  <h1>{{info.title}} <span style="font-size: 14px;" class="version">{{info.version}}</span></h1>
  <div>[ Base URL: {{shortUrl}} ]</div>
  <div>
  <a class="text-decoration-none" target="_blank" :href="url" :title="url">
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
  methods: {},
});
