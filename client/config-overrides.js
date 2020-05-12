const path = require("path");
const { paths } = require("react-app-rewired");

const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addPostcssPlugins,
  addWebpackAlias,
  addWebpackModuleRule,
  // adjustWorkbox,
  // addLessLoader
} = require("customize-cra");

const config = require(`${paths.scriptVersion}/config/webpack.config.js`)(
  process.env.NODE_ENV,
);

// const { GenerateSW } = require("workbox-webpack-plugin");

const appendScssLoader = Loader => {
  let scssLoader = [...config.module.rules[2].oneOf[5].use, ...Loader];

  return scssLoader;
};

//生产环境去除console.* functions
// const overridePlugins = () => {
//   return config => {
//     if (config.optimization.minimizer) {
//       config.optimization.minimizer.forEach(minimizer => {
//         if (minimizer.constructor.name === "TerserPlugin") {
//           //   minimizer.options.terserOptions.compress.drop_console = true
//           minimizer.options.terserOptions.keep_fnames = true;
//         }
//       });
//     }

//     return config;
//   };
// };

// const overrideWorkbox = () => {
//   return config => {
//     // console.log(env, `[WorkBox] this is env`);

//     // console.log(
//     //   `[Workbox default config] ${JSON.stringify(defaultInjectConfig)}`,
//     // );
//     // // if (env === "production") {
//     // console.log("Production build - Adding Workbox for PWAs");
//     // const workboxConfig = {
//     //   ...defaultInjectConfig,
//     //   swSrc: path.join(__dirname, "src", "custom-sw.js"),
//     //   // swSrc: path.join(process.cwd(), "/app/resources/service-worker.js"),
//     //   swDest: "sw.js",
//     // };

//     // config = rewireWorkboxInject(workboxConfig)(config, env);
//     // // }
//     config = removePreWorkboxWebpackPluginConfig(config);

//     // let workboxPlugin = new InjectManifest({
//     //   swSrc: path.join(__dirname, "src", "custom-sw.js"),
//     //   swDest: "service-worker.js",
//     //   include: [/\.html$/, /\.js$/, /\.css$/, /\.woff2$/, /\.jpg$/, /\.png$/],
//     //   exclude: [/\.map$/, /asset-manifest\.json$/],
//     // });
//     const publicUrl = process.env.PUBLIC_URL;

//     console.log(`[Workbox] ${publicUrl}`);

//     let workboxPlugin = new GenerateSW({
//       clientsClaim: true,
//       exclude: [/\.map$/, /asset-manifest\.json$/],
//       importWorkboxFrom: "cdn",
//       navigateFallback: `${publicUrl}/index.html`,
//       navigateFallbackBlacklist: [
//         // Exclude URLs starting with /_, as they're likely an API call
//         new RegExp("^/_"),
//         // Exclude any URLs whose last part seems to be a file extension
//         // as they're likely a resource and not a SPA route.
//         // URLs containing a "?" character won't be blacklisted as they're likely
//         // a route with query params (e.g. auth callbacks).
//         new RegExp("/[^/?]+\\.[^/]+$"),
//       ],
//     });

//     config.plugins = [...config.plugins, workboxPlugin];

//     return config;
//   };
// };

module.exports = override(
  // 关于webpack的相关配置
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addDecoratorsLegacy(),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  }),
  addWebpackModuleRule({
    test: /\.(scss|sass)$/,
    use: appendScssLoader([
      {
        loader: "sass-resources-loader",
        options: {
          resources: path.resolve(__dirname, "src/assets/sass/global.scss"),
        },
      },
    ]),
  }),
  addPostcssPlugins([
    require("postcss-pxtorem")({
      rootValue: 100,
      propWhiteList: [],
      // unitPrecision: 5,
      // propList: ['*'],
      // selectorBlackList: [],
      // replace: true,
      // mediaQuery: false,
      // minPixelValue: 12
    }),
    require("cssnano")({
      autoprefixer: false,
      "postcss-zindex": false,
    }),
    require("postcss-write-svg")({
      utf8: false,
    }),
  ]),
  // overridePlugins(),
  // overrideWorkbox(),
);

// function removePreWorkboxWebpackPluginConfig(config) {
//   const preWorkboxPluginIndex = config.plugins.findIndex(element => {
//     return Object.getPrototypeOf(element).constructor.name === "GenerateSW";
//   });

//   if (preWorkboxPluginIndex !== -1) {
//     config.plugins.splice(preWorkboxPluginIndex, 1);
//   }

//   return config;
// }
