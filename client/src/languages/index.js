import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementRuLocale from 'element-ui/lib/locale/lang/ru-RU'
import enLocale from './en'
import ruLocale from './ru'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  ru: {
    ...ruLocale,
    ...elementRuLocale
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')

  if (chooseLanguage) {
    return chooseLanguage
  }

  return 'en'
}

const i18n = new VueI18n({
  // set locale
  // options: en | ru
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
