import { playMode } from "common/js/config";
import { loadSearch, loadFavorite, loadPlay } from "common/js/cache";

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
  favoriteList: loadFavorite(),
  playHistory: loadPlay()
};

export default state;
