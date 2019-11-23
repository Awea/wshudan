const assign = require('lodash.assign')

export default {
  webpack(config, env, helpers, options) {
    // Following is required for @sabaki/sgf to works in the browser - @awea 20191123
    // Source: https://github.com/SabakiHQ/sgf#use-in-the-browser
    config.node = assign({}, config.node, {
      'fs': 'empty',
      // Add the next lines to disable automatic encoding detection
      // and reduce bundle size:
      'jschardet': 'empty',
      'iconv-lite': 'empty'
    })
  }
}
