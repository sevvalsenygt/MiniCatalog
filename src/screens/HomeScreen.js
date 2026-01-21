import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { getFavoriteIds } from "../storage/favorites";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [favCount, setFavCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setErr("");
      setLoading(true);
      const [items, favIds] = await Promise.all([fetchProducts(), getFavoriteIds()]);
      setProducts(items);
      setFavCount(favIds.length);
    } catch (e) {
      setErr(e?.message ?? "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    return unsub;
  }, [navigation]);

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Yükleniyor…</Text>
      </View>
    );
  }

  if (err) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>{err}</Text>
        <Pressable onPress={load} style={styles.btn}>
          <Text style={styles.btnText}>Tekrar Dene</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Ürünler</Text>
        <Pressable onPress={() => navigation.navigate("Favorites")} style={styles.favBtn}>
          <Text style={styles.favBtnText}>Favoriler ({favCount})</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate("Detail", { product: item })} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  loadingText: { marginTop: 10 },

  err: { color: "#b00020", fontSize: 15, textAlign: "center" },
  btn: { marginTop: 12, backgroundColor: "#111", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  btnText: { color: "white", fontWeight: "600" },

  topBar: { padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  topTitle: { fontSize: 18, fontWeight: "700" },
  favBtn: { backgroundColor: "#111", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  favBtnText: { color: "white", fontWeight: "600" },

  listContent: { paddingBottom: 16 },
});
