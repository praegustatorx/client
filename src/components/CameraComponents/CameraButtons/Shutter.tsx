import { TouchableOpacity, View, StyleSheet } from "react-native";
import { type FC } from "react";

interface ShutterProps {
  onPress: () => void;
}

const Shutter: FC<ShutterProps> = (props) => {
  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.shutterButtonShell}>
      <View style={styles.ShutterButtonInner} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shutterButtonShell: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  ShutterButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
});
export default Shutter;
