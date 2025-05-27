import { View, Text } from "react-native";
import CustomModal from "./CustomModal";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

interface ManualPantryAddModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  isError: boolean;
}
const ManualPantryAddModal = ({
  visible,
  setVisible,
  isError,
}: ManualPantryAddModalProps) => {
  const successView = (
    <>
      <View style={{ marginBottom: 20 }}>
        <Octicons name="check-circle-fill" size={70} color="black" />
      </View>
      <View>
        <Text style={{ fontSize: 17 }}>Ingredient added to pantry!</Text>
      </View>
    </>
  );

  const errorView = (
    <>
      <View style={{ marginBottom: 20 }}>
        <MaterialIcons name="error" size={70} color="black" />
      </View>
      <View>
        <Text style={{ fontSize: 17 }}>
          Something went wrong, please try again!
        </Text>
      </View>
    </>
  );

  return (
    <CustomModal
      visible={visible}
      setVisible={setVisible}
      appearance="notification"
      modalTitle={isError ? "Error" : "Success"}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isError ? errorView : successView}
      </View>
    </CustomModal>
  );
};
export default ManualPantryAddModal;
