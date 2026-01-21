import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "MiniCatalog" }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Ürün Detayı" }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favoriler" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
