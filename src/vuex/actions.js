import * as types from './mutation-types'


export const selectPlay = function ({ commit, state }, { list, index }) { //action 里面自带的commit，state使我们能拿到state
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CUTTENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}