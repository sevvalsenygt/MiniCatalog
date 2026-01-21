import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FAVORITES_V1";

export async function getFavoriteIds() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function isFavorite(id) {
  const ids = await getFavoriteIds();
  return ids.includes(id);
}

export async function toggleFavorite(id) {
  const ids = await getFavoriteIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}