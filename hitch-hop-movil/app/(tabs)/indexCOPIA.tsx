import { StyleSheet, View } from "react-native";
import ProfileSettings from "./UserSettings/ProfileSettings";

export default function Index() {
  return (
    <View style={styles.container}>
      <ProfileSettings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});