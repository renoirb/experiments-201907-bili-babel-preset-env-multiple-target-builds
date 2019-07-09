/**
 * Output target.
 *
 * On which runtime this code build output is planned to run on?
 * A Web Browser, Node.js?
 *
 * See https://bili.egoist.sh/#/
 */
export declare type OutputTarget = 'node' | 'browser'
/**
 * Rollup (and bili) Output format(s). You can append `min` to the format to generate minified bundle.
 * See https://bili.egoist.sh/#/
 *
 * NOTE: At the moment it is hardcoded using the same as ModuleFormat from 'rollup' source code.
 */
export declare type Format =
  | 'amd'
  | 'cjs'
  | 'commonjs'
  | 'es'
  | 'esm'
  | 'iife'
  | 'module'
  | 'system'
  | 'umd'
  | 'cjs-min'
  | 'es-min'
  | 'esm-min'
  | 'umd-min'
  | 'iife-min'
  | 'amd-min'
  | 'system-min'
/**
 * @frontend-bindings/bundling-config Options
 */
export interface BundlingConfigOptions {
  /**
   * At bili initialization we might have found a hint that the project is written in TypeScript
   */
  isTypeScript?: boolean
  /**
   * Rollup Output format(s). You can append `min` to the format to generate minified bundle.
   *
   * From bili CLI you can use --format option
   *
   * @cli `--format <format>`
   */
  format?: Format
  /**
   * Output target
   *
   * @cli `--target <target>`
   */
  target?: OutputTarget
  /**
   * corejs version as string
   */
  corejs?: string
}
