import Vue from 'vue'
import VueI18n from 'vue-i18n'
//import vnMessage from './vn.json'
//import enMessage from './en.json'

Vue.use(VueI18n)

const messages = {
  vn: {
    message: {
      hello: 'Xin chào'
    }
  },
  fr: {
    message: {
      hello: 'Bonjour monde'
    }
  }
}

const i18n = new VueI18n({
  locale: 'vn', // set locale
  messages,
  fallbackLocale: 'vn',
})

export default i18n