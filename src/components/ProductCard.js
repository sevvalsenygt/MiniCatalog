import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>₺{product.price}</Text>
      </View>
      <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  pressed: { opacity: 0.85 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  title: { flex: 1, fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, fontWeight: "700" },
  desc: { marginTop: 8, color: "#444" },
});
