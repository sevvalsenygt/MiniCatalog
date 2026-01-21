import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { getFavoriteIds } from "../storage/favorites";

export default function FavoritesScreen({ navigation }) {
  const [items, setItems] = useState([]);

  async function load() {
    const [all, favIds] = await Promise.all([
      fetchProducts(),
      getFavoriteIds(),
    ]);

    setItems(all.filter((p) => favIds.includes(p.id)));
  }

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    return unsub;
  }, [navigation]);

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.root}>
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Henüz favorin yok.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(x) => x.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("Detail", { product: item })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
