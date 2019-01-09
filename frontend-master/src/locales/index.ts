import Vue from 'vue';
import VueI18n from 'vue-i18n';

import * as en from './i18n/en_US.json';
import * as de from './i18n/de_DE.json';

Vue.use(VueI18n)

const messages = {
  vn: {
    lang: {
        en
    }
  },
  fr: {
    lang: {
      de
    }
  }
}

export default new VueI18n({
  locale: 'de', // set locale
  messages
})