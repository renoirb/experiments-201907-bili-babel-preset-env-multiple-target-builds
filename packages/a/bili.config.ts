import { bili } from '@frontend-bindings/bundling-config'
import { Config, ConfigOutput, BabelPresetOptions } from 'bili'
import pkg from './package'

const output: ConfigOutput = {
  sourceMap: false,
  target: 'node',
}

const babel: BabelPresetOptions = {}

const config: Config = {
  babel,
  input: 'src/index.ts',
  output,
}

export default {
  ...config,
  ...bili.config(pkg),
}
