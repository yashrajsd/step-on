import { Stack, Slot } from "expo-router";

export default function SettingsLayout() {
    return (
        // <Stack
        //     screenOptions={{
        //         gestureEnabled: true, // Enable swipe-back gestures
        //         headerShown: false,   // Hide header if not needed
        //     }}
        // >
            <Slot />
        // {/* </Stack> */}
    );
}
