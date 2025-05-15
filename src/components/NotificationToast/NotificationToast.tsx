import React, { Children, ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from "react-native";

interface NotificationToastProps {
  visible: boolean;
  title: string;
  message: string;
  duration?: number;
  children?: ReactNode;
  onClose: () => void;
}

const NotificationToast = ({
  visible,
  title,
  message,
  duration = 3000,
  children,
  onClose,
}: NotificationToastProps) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.toast}>
        {children && children}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 50,
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    gap: 5,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 12,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
});

export default NotificationToast;
