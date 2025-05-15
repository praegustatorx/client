import { FC, ReactNode } from "react";
import { View } from "../Themed";
import HeaderTitle from "./FieldGroupTitle";

interface FieldGroupProps {
  children: ReactNode;
  groupTitle: string;
}

const FieldGroup: FC<FieldGroupProps> = ({ children, groupTitle }) => {
  return (
    <View className="mb-6">
      <HeaderTitle title={groupTitle} />
      <View>{children}</View>
    </View>
  );
};

export default FieldGroup;
