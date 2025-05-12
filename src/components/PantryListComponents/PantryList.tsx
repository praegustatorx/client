import { FC, useState } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, { ScrollHandlerProcessed } from "react-native-reanimated";
import TabTitle from "../Shared/TabTitle";
import EmptyPantryList from "./EmptyPantryList";
import NotificationToast from "../NotificationToast/NotificationToast";

import SuccessIcon from "../Icons/SuccessIcon";
import FailIcon from "../Icons/FailIcon";

import { Ingredient } from "@/src/constants/Pantry";
import ErrorScreen from "./ErrorScreen";
import PantryItem from "./PantryItem";

interface PantryListProps {
  onScroll: ScrollHandlerProcessed<Record<string, unknown>>;
  scrollY: number;
  data: Ingredient[] | undefined;
}

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const PantryList: FC<PantryListProps> = (props) => {
  const { onScroll, scrollY, data } = props;
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showFalureToast, setShowFailureToast] = useState<boolean>(false);

  return (
    <>
      <View className="flex flex-1">
        {!data ? (
          <EmptyPantryList text="No items in pantry." />
        ) : (
          <AnimatedFlashList
            data={data}
            onScroll={onScroll}
            estimatedItemSize={100}
            renderItem={({ item, index }: { item: any; index: number }) => (
              <PantryItem
                item={item}
                key={index}
                successToast={setShowSuccessToast}
                failureToast={setShowFailureToast}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <TabTitle scrollY={scrollY} text="Pantry" />
            )}
          />
        )}
      </View>
      <NotificationToast
        visible={showSuccessToast}
        title="Item Deleted"
        message="Item has been deleted from the pantry"
        onClose={() => setShowSuccessToast(false)}
      >
        <SuccessIcon color="black" size={22} />
      </NotificationToast>

      <NotificationToast
        visible={showFalureToast}
        title="Failure"
        message="Something went wrong."
        onClose={() => setShowFailureToast(false)}
      >
        <FailIcon color="black" size={22} />
      </NotificationToast>
    </>
  );
};
export default PantryList;
