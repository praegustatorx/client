import { TouchableOpacity, useColorScheme } from "react-native";
import { Text } from "../Themed";
import { Link } from "expo-router";
import { type FC } from "react";

interface LandingPageButtonProps {
  destination: "/SignUpPage" | "/LoginPage";
  text: string;
  type?: "primary" | "secondary";
}

const LandingPageButton: FC<LandingPageButtonProps> = ({
  destination,
  text,
  type = "primary",
}) => {
  const isPrimary = type === "primary";

  const containerClasses = isPrimary
    ? "bg-[#006d5b]"
    : "bg-[#006d5b22] border border-[#006d5b]";

  const textClasses = isPrimary ? "text-white" : "text-[#006d5b]";

  return (
    <Link href={destination} asChild>
      <TouchableOpacity
        className={`flex flex-1 py-3 rounded-xl mt-5 ml-1 items-center justify-center ${containerClasses}`}
      >
        <Text
          lightColor="white"
          darkColor="white"
          className={`${textClasses} text-center font-bold text-base`}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default LandingPageButton;
