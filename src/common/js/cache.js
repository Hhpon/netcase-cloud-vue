import storage from "good-storage";

const SEARCH_KEY = "__search__";
const SEARCH_MAX_LENGTH = 15;

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

function insertArray(arr, query, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(query);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  insertArray(
    searches,
    query,
    item => {
      return item === query;
    },
    SEARCH_MAX_LENGTH
  );
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, []);
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, item => {
    return item === query;
  });
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}

export function saveFavorite(song) {
  let favorites = storage.get(FAVORITE_KEY, [])
  insertArray(favorites, song, item => {
    return item.songId === song.songId
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, favorites)
  return favorites
}

export function deleteFavorite(song) {
  let favorites = storage.get(FAVORITE_KEY, [])
  deleteFromArray(favorites, item => {
    return item.songId = song.songId
  })
  storage.set(FAVORITE_KEY, favorites)
  return favorites
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

export function savePlay(song) {
  let playes = storage.get(PLAY_KEY, [])
  insertArray(playes, song, item => {
    return item.songId === song.songId
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, playes)
  return playes
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
