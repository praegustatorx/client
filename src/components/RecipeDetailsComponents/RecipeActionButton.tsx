import { ReactNode, type FC } from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import RecipeActionText from "./RecipeActionText";

interface RecipeActionButtonProps {
  action: string;
  children: ReactNode;
  onClick?: () => void;
}

const RecipeActionButton: FC<RecipeActionButtonProps> = ({
  action,
  onClick,
  children,
}) => {
  const lowerAction = action.toLowerCase();

  const isDelete = lowerAction === "delete";
  const backgroundColor = isDelete
    ? "rgba(255, 0, 0, 0.1)" // soft red
    : "rgba(0, 255, 0, 0.1)"; // soft green

  const glowColor = isDelete ? "rgba(255, 0, 0, 0.7)" : "rgba(0, 255, 0, 0.7)";

  return (
    <TouchableOpacity
      key={action}
      onPress={onClick}
      style={[
        styles.actionButton,
        {
          backgroundColor,
          shadowColor: glowColor,
          ...Platform.select({
            ios: {
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 10,
            },
            android: {
              elevation: 6,
            },
          }),
        },
      ]}
    >
      {children}
      <RecipeActionText action={action} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    gap: 2,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecipeActionButton;
