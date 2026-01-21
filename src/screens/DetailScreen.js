import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { isFavorite, toggleFavorite } from "../storage/favorites";

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [fav, setFav] = useState(false);

  const syncFav = useCallback(async () => {
    const result = await isFavorite(product.id);
    setFav(result);
  }, [product.id]);

  useEffect(() => {
    syncFav();
  }, [syncFav]);

  const onToggle = useCallback(async () => {
    await toggleFavorite(product.id);
    await syncFav();
  }, [product.id, syncFav]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₺{product.price}</Text>

      <Text style={styles.desc}>{product.description}</Text>

      <Pressable onPress={onToggle} style={styles.btn}>
        <Text style={styles.btnText}>
          {fav ? "Favorilerden çıkar" : "Favorilere ekle"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Favorites")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Favorilere git →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 20, fontWeight: "800" },
  price: { fontSize: 16, fontWeight: "700" },
  desc: { fontSize: 15, color: "#333", lineHeight: 22, marginTop: 6 },
  btn: {
    marginTop: 14,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "700" },
  link: { marginTop: 10, padding: 8 },
  linkText: { color: "#111", fontWeight: "700" },
});


