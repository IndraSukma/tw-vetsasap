const path = require("path")
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin")
const Nunjucks = require("nunjucks")
const glob = require("glob-all")
const dataGlobal = require("./src/data/_global.json")

const PATH = {
  pages: path.join(__dirname, "src/views/pages/"),
  data: path.join(__dirname, "src/data/"),
}
const data = glob.sync(path.relative(__dirname, path.join(PATH.data, "/**/*.json")))
const entry = glob.sync(path.relative(__dirname, path.join(PATH.pages, "/**/*.html"))).reduce((entry, file) => {
  const filename = path.relative(PATH.pages, file).replace(/\.html$/, "")
  const dataname = file.replace("views/pages", "data").replace(/\.html$/, ".json")
  entry[filename] = { import: file }
  if (data.includes(dataname)) entry[filename]["data"] = dataname
  return entry
}, {})

module.exports = (env, argv) => {
  const isProd = argv.mode === "production"
  const config = {
    mode: "development",
    devtool: "source-map",
    stats: "minimal",
    output: {
      path: path.join(__dirname, "dist"),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      watchFiles: {
        paths: ["src/views/**/*.*", "src/assets/**/*.*", "tailwind.config.js"],
        options: { usePolling: true },
      },
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: "/index.html" },
          { from: /./, to: "/404.html" },
        ],
      },
      compress: true,
    },
    resolve: {
      alias: {
        "@script": path.resolve(__dirname, "src/assets/js/"),
        "@style": path.resolve(__dirname, "src/assets/scss/"),
        "@img": path.resolve(__dirname, "src/assets/img/"),
      },
    },
    plugins: [
      new HtmlBundlerPlugin({
        entry: entry,
        js: {
          filename: (pathData) => {
            let filename = pathData.filename.split("\\").pop()
            if (isProd) filename = filename.replace(/\.js$/, ".min.js")
            return `assets/js/${filename}`
          },
        },
        css: {
          filename: (pathData) => {
            let filename = pathData.filename.split("\\").pop()
            filename = isProd ? filename.replace(/\.scss$/, ".min.css") : filename.replace(/\.scss$/, ".css")
            return `assets/css/${filename}`
          },
        },
        loaderOptions: {
          preprocessor: (template, { data }) => {
            const njk = Nunjucks.configure(path.join(__dirname, "src/views/"))
            njk.addGlobal("global", dataGlobal)
            return njk.renderString(template, data)
          },
        },
        minify: {
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeEmptyAttributes: true,
          removeComments: true,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: ["css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg|ico)$/,
          type: "asset/resource",
          generator: {
            filename: (pathData) => pathData.filename.replace("src/", ""),
          },
        },
      ],
    },
    performance: {
      hints: false,
    },
  }

  return config
}
