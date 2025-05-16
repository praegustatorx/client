import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DeleteIcon from "../Icons/DeleteIcon";

const List = ({ data, onDelete }: any) => (
  <FlatList
    data={data}
    keyExtractor={(item, index) => `${item}-${index}`}
    renderItem={({ item }) => (
      <View style={styles.container}>
        <Text style={styles.text}>{item}</Text>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <DeleteIcon color="red" size={24} />
        </TouchableOpacity>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  text: { fontSize: 15 },
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});
export default List;
