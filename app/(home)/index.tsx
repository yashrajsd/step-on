import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';

import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { height: screenHeight } = Dimensions.get("window");

export default function Page() {
    const router = useRouter();
    const { isSignedIn } = useUser();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && isSignedIn) {
            router.replace('/(home)/main');
        }
    }, [isMounted, isSignedIn, router]);

    if (!isMounted) {
        return null;
    }

    return (
        <View style={styles.container}>
            <SignedOut>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#FFF', position: 'relative' }}>
                        <LottieView
                            loop
                            autoPlay
                            source={require('@/assets/animation/user.json')}
                            style={{ height: 500, margin: 0, position: 'relative', top: 40 }}
                        />
                        <LinearGradient
                            colors={['rgba(26, 70, 86, 0)', 'rgba(26, 70, 86, 1)']}
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                zIndex: 10,
                                top: 0,
                            }}
                        />
                    </View>
                    <SafeAreaView style={{ width: '100%' }}>
                        <View style={{ paddingHorizontal: 20, gap: 10, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                            <Text style={{ width: '100%', color: '#FFF', fontWeight: '700', fontSize: 20 }}>
                                Step On
                            </Text>
                            <Text style={{ width: '100%', color: '#FFF', marginBottom: 20 }}>
                                Your AI powered walking assistant by your side
                            </Text>
                            <Pressable
                                style={{ paddingVertical: 15, borderRadius: 7, backgroundColor: '#FFF', width: '100%' }}
                                onPress={() => router.push('/(auth)/sign-in')} // Navigate to sign-in
                            >
                                <Text style={{ textAlign: 'center', fontWeight: '600' }}>
                                    Sign In
                                </Text>
                            </Pressable>
                            <TouchableOpacity
                                style={{ paddingVertical: 15, borderRadius: 7, width: '100%', borderWidth: 1, borderColor: '#2B7691' }}
                                onPress={() => router.push('/(auth)/sign-up')} // Navigate to sign-up
                            >
                                <Text style={{ textAlign: 'center', fontWeight: '600', color: '#FFF' }}>
                                    Create Account
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            </SignedOut>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A4656',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 30,
        display: 'flex',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: '700',
        fontSize: 20,
    },
    logopara: {
        marginTop: 10,
    },
});
