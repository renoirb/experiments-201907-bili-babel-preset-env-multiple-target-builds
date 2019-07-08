import {Config, ConfigOutput} from "bili"

const output: ConfigOutput = {
  format: ['cjs', 'es'],
  extractCSS: false,
  sourceMap: true,
  sourceMapExcludeSources: true
}

/**
 * https://bili.egoist.sh/#/plugins
 * https://github.com/egoist/bili/blob/master/src/index.ts#L158
 */
const plugins: {[name: string]: any} = {
  analyzer: {
    // rollup-plugin-analyzer
    // https://github.com/doesdev/rollup-plugin-analyzer
    stdout: true,
    // @ts-ignore
    onAnalysis(...args) {
      return rollupPluginAnalyzerOnAnalysis.call(this, ...args)
    },
  },
  babel: true,
  terser: {
    // rollup-plugin-terser
    // https://github.com/TrySound/rollup-plugin-terser
    // https://github.com/terser-js/terser#terser
    // https://github.com/terser-js/terser/blob/master/lib/output.js#L164
    output: {
      // @ts-ignore
      // https://github.com/TrySound/rollup-plugin-terser/issues/12#issuecomment-433010270
      comments(node, comment) {
        if (comment.type === "comment2") {
            // multiline comment
            return /@preserve|@license|@cc_on|^!/i.test(comment.value);
        }
        return false;
      },
      quote_style: 1,
      max_line_len: 1024,
    },
  },
}

const config: Config = {
  output: {
      format: ["cjs", "umd", "esm"],
      moduleName: "immer",
      sourceMap: true,
      sourceMapExcludeSources: true
  },
  plugins,
  extendConfig(config, {format}) {
      if (format === "umd") {
          config.output.minify = true
      }
      if (format === "esm") {
          config.output.fileName = "[name].module.js"
      }
      return config
  }
}

export default config

