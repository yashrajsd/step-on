import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  return (
    <View style={{flex:1,backgroundColor:'#1A4656'}}>
      <SafeAreaView style={styles.safeArea}>
        <View>
        <View style={styles.animatedContainer}>
          {/* <View style={styles.animatedView}>
        <LottieView
        source={require('@/assets/animation/hi2.json')}
        style={styles.lottie}
          autoPlay
          loop
        />
      </View> */}
          <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Text style={{ fontWeight: '700', textAlign: 'left',color:'white',fontSize:22,width:'100%'}}>
              Welcome Back again!
            </Text>
            <Text style={{ fontSize: 12, textAlign: 'left',color:'#95C7D9',marginTop:5 }}>
              Get started with existing account
            </Text>
          </View>
        </View>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#FFF"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          style={styles.input}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
        />
        </View>
        {/* Custom styled button */}
        <View>
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={{color:'#FFF'}}>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text style={{color:'#FFF',fontWeight:'500'}}>Sign up</Text>
          </Link>
        </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  animatedContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  animatedView: {
    overflow: 'hidden',
    height: 55,
    width: 55,
    backgroundColor: '#131313',
    marginBottom: 10,
    borderRadius: 50
  },
  safeArea: {
    display: 'flex',
    paddingHorizontal: 20,
    justifyContent:'space-between',
    flex: 1,
    marginBottom:20,
    marginTop:20
  },
  lottie: {
    width: '100%',
    height: '100%',
    color: '#ffffff'
  },
  input: {
    color: '#FFF',
    fontWeight:'600',
    borderRadius: 7,
    marginVertical: 5,
    padding: 10,
    backgroundColor:'#1D5367',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius:7,
    paddingVertical: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#131313',
    fontSize: 16,
    fontWeight:'600'
  },
  signUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop:10
  }
})
