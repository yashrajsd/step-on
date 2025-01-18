import Home from '@/components/tabs/home'
import { SignedIn, SignedOut} from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {


    return (
        <View style={styles.container}>
            <SignedIn>
                <Home/>
            </SignedIn>
            <SignedOut>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/assets/images/robot.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <SafeAreaView style={styles.safeArea}>
                    <Text style={styles.logo}>
                        Step On
                    </Text>
                    <Text style={styles.logopara}>
                        Your AI powered walking assistant by your side
                    </Text>
                    <View style={styles.linksContainer}>
                        <Link href="/(auth)/sign-in">
                            <View style={styles.linkWrapper}>
                                <Text style={styles.linkText}>Sign in</Text>
                            </View>
                        </Link>
                        <Link href="/(auth)/sign-up">
                            <View style={styles.linkWrapper2} >
                                <Text style={styles.linkText2}>Create Account</Text>
                            </View>
                        </Link>
                    </View>
                </SafeAreaView>
            </SignedOut>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 30,
        display:'flex',
        justifyContent:'center'
    },
    imageContainer: {
        maxHeight: '50%',
        backgroundColor: '#2A31FF',
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    linksContainer: {
        flex: 1,
        paddingVertical: 20,
        gap:20
    },
    linkWrapper: {
        borderColor: '#CDCDCD',
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 20,
        width: '100%',
        display: 'flex',
    }, linkWrapper2: {
        borderWidth: 1,
        backgroundColor:'#131313',
        borderRadius: 50,
        paddingVertical: 20,
        width: '100%',
        display: 'flex',
    },
    linkText: {
        fontSize: 16,
        textAlign:'center',
    },
    linkText2: {
        fontSize: 16,
        color: '#ffffff',
        textAlign:'center'
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 16,
    },
    logo: {
        fontWeight: '700',
        fontSize: 20,
    },
    logopara: {
        marginTop: 10,
    },
})
