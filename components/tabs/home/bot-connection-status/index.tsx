import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
};

export default function BotStatus({ connected, setConnected }: Props) {
  const ringScale = useSharedValue(1);

  useEffect(() => {
    ringScale.value = withRepeat(withTiming(1.5, { duration: 1000 }), -1, true);
  }, []);

  const animatedRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: 1.5 - ringScale.value,
  }));

  return (
    <View style={styles.container}>
      {connected ? (
        <>
          <View style={styles.textContainer}>
            <View style={styles.statusContainer}>
              <View style={styles.greenCircle}>
                <Animated.View style={[styles.greenRing, animatedRingStyle]} />
              </View>
              <Text style={styles.name}>StepBot </Text>
              <Text style={styles.status}>- Connected</Text>
            </View>
          </View>
          <LottieView
            source={require("@/assets/animation/eyes.json")}
            loop
            autoPlay
            style={styles.lottie}
          />
        </>
      ) : (
        <View style={styles.searchingContainer}>
          <LottieView
            source={require("@/assets/animation/searching.json")}
            loop
            autoPlay
            style={styles.lottie}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setConnected(!connected);
          }}
        >
          <Text style={styles.buttonText}>
            {connected ? "Disconnect" : "Connect"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    flex: 1,
    justifyContent: "space-between", // Space content evenly with the button at the bottom
    paddingBottom: 20, // Add spacing below the button
  },
  textContainer: {
    paddingHorizontal: 25,
  },
  searchingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  greenRing: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "green",
  },
  name: {
    fontWeight: "600",
    fontSize: 25,
  },
  status: {
    fontSize: 14,
    color: "#1C1C1C",
    marginTop: 5,
  },
  lottie: {
    width: 450,
    height: 300,
    alignSelf: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#CDCDCD",
    borderWidth: 1,
    paddingVertical: 25,
  },
  buttonText: {
    color: "#131313",
    fontWeight: "600",
  },
});
