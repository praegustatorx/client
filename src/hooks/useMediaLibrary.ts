import * as ImagePicker from "expo-image-picker";

const useMediaLibrary = (): {
  launchImageLibrary: () => Promise<ImagePicker.ImagePickerAsset | undefined>;
} => {
  const launchImageLibrary = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      return result.assets[0];
    }
  };

  return { launchImageLibrary };
};
export default useMediaLibrary;
