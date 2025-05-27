import { FC, useState } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, { ScrollHandlerProcessed } from "react-native-reanimated";
import TabTitle from "../Shared/TabTitle";
import EmptyPantryList from "./EmptyPantryList";
import { Ingredient } from "@/src/constants/Pantry";
import PantryItem from "./PantryItem";

interface PantryListProps {
  onScroll: ScrollHandlerProcessed<Record<string, unknown>>;
  scrollY: number;
  data: Ingredient[] | undefined;
}

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const PantryList: FC<PantryListProps> = (props) => {
  const { onScroll, scrollY, data } = props;

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
              <PantryItem item={item} key={item.id} index={index} />
            )}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <TabTitle text="Pantry" />}
          />
        )}
      </View>
    </>
  );
};
export default PantryList;
