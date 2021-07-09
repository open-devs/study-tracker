import { createStore, createLogger } from 'vuex'
import ui from './modules/ui'
import subjects from './modules/subjects'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    ui,
    subjects,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
