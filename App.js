import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ManualControlScreen from "./Screens/ManualControlScreen";
import AutoScreen2 from "./Screens/AutoScreen2";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { openDatabase } from "react-native-sqlite-storage";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.contentWrapper}>
      <StatusBar animated={true} barStyle="white" />

      <Text style={styles.sectionTitle}>Connection status</Text>

      <View style={styles.loadingStatus}>
        <ActivityIndicator
          size="large"
          color="#1CFFFC"
          style={styles.loadingStatus}
        />
      </View>

      <View style={styles.fixToText}>
        <Button
          title="Manual Align"
          onPress={() => navigation.navigate("MCScreen")}
        />
        <Button
          title="Auto Align"
          onPress={() => navigation.navigate("ACScreen2")}
        />
      </View>
    </View>
  );
}

/*function ACScreen({ navigation }) {
  return <AutoControlScreen />;
}*/

function MCScreen({ navigation }) {
  return <ManualControlScreen />;
}

function ACScreen2({ navigation }) {
  return <AutoScreen2 />;
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#252525" },
          headerTintColor: "#fff",
          headerTitleStyle: "bold",
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ACScreen2"
          component={ACScreen2}
          options={{ title: "Automatic Receiver Alignment" }}
        />
        <Stack.Screen
          name="MCScreen"
          component={MCScreen}
          options={{ title: "Manual Receiver Alignment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 100,
  },
  loadingStatus: {
    alignContent: "center",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
