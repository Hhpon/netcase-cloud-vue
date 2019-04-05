import { playMode } from "common/js/config";
import { loadSearch, loadFavorite } from "common/js/cache";

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  searchHistory: loadSearch(),
  favoriteList: loadFavorite()
};

export default state;
