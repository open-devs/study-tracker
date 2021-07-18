import { createStore, createLogger } from 'vuex'
import ui from './modules/ui'
import subjects from './modules/subjects'
import choices from './modules/choices'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    ui,
    subjects,
    choices
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
