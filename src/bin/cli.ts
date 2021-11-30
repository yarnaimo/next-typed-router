import getopts from 'getopts'
import { generate } from './commands/generate'

const help = `
Usage:

next-typed-pages generate <output-path>   Generate pages file
  --dir, -d         Path to pages directory (default: src/pages)
  --name, -n        Variable name of exported \`pages\` object (default: pages)
  --defaultExport   Default export pages object (default: false)
`.trim()

export const cli = async () => {
  const {
    _: [command, ...args],
    dir,
    name,
    defaultExport,
  } = getopts(process.argv.slice(2), {
    alias: { dir: 'd', name: 'n' },
    boolean: ['defaultExport'],
    default: { dir: 'src/pages', name: 'pages' },
  })

  switch (command) {
    case 'generate':
      if (!args[0]) {
        console.error('Output path must be specified')
        process.exit(1)
      }
      void generate({ output: args[0], dir, name, defaultExport })
      break

    case '--help':
      console.log(help)
      break

    default:
      console.log(help)
      process.exit(1)
  }
}