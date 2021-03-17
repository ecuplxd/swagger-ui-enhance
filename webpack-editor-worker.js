const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// AngularCompilerPlugin
const ACP = require("@ngtools/webpack/src");

module.exports = (config) => {
  config.module.rules.unshift({
    test: /\.html$/,
    use: [
      {
        loader: path.resolve(__dirname, "html-loader"),
      },
      {
        loader: "raw-loader",
      },
    ],
  });

  const plugins = config.plugins;
  const index = plugins.findIndex(
    (p) => p instanceof ACP.AngularCompilerPlugin
  );
  const oldOptions = plugins[index]._options;

  // https://github.com/angular/angular-cli/issues/14534
  oldOptions.directTemplateLoading = false;

  plugins.splice(index);
  plugins.push(new ACP.AngularCompilerPlugin(oldOptions));
  plugins.push(
    new MonacoWebpackPlugin({
      languages: ["typescript"],
    })
  );

  return config;
};
