const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
  	tailwindcss('./tailwind.config.js'),
  	purgecss({
  		content: ['./public/index.html', './src/**/*.vue']
  	}),
    require('autoprefixer')
  ]
}
