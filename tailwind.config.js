// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.svelte'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      orange: {
        bright: '#FEBF9A',
        lighter: '#FD8B49',
        default: '#F75C03',
        dark: '#CA4B02'
      },
      rose: {
        bright: '#FD86BE',
        lighter: '#FC2288',
        default: '#D90368',
        dark: '#A1024C'
      },
      byzantium: {
        bright: '#FC36CA',
        lighter: '#C90397',
        default: '#820263',
        dark: '#50013D'
      },
      purple: {
        bright: '#AE6F8F',
        lighter: '#5B3347',
        default: '#291720',
        dark: '#0D070A'
      },
      green: {
        bright: '#4CFAC6',
        lighter: '#06EFA9',
        default: '#04A777',
        dark: '#037754'
      },
      gray: {
        bright: '#CCC',
        lighter: '#AAA',
        default: '#999',
        dark: '#666'
      },
      white: '#FFF',
      black: '#000',
      coal: '#333'
    },
    spacing: {
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '32px',
      '7': '48px',
      '8': '64px',
      '9': '128px',
    }
  },
  variants: {},
  plugins: [],
}