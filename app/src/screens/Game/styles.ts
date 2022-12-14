import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginTop: 28,
  },
  logo: {
    width: 72,
    height: 40,
  },
  right: {
    width: 20,
    height: 20,
  },
  cover: {
    width: 311,
    height: 160,
    borderRadius: 8,
    marginTop: 32,
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: "flex-start",
  },
  containerList: {
    width: "100%",
  },
});
