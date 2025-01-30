import * as React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 ,backgroundColor:'#1A4656'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          <View style={{ height: '60%', width: '100%',backgroundColor: "#6956FF",}}>
            <LottieView
              source={require('@/assets/animation/otp.json')}
              style={{ height: '100%', width: 'auto' }}
              autoPlay
              loop
            />
          </View>
          <SafeAreaView style={[styles.safearea,{gap:20,alignItems:'center'}]}>
            <View style={{width:'100%'}}>
            <Text style={{ fontSize: 18,color:'#FFF',fontWeight:'600',textAlign:'left',width:'100%'}}>Verify your email</Text>
            {/* <Text style={{color:'#FFF',opacity:0.7,marginTop:2}}>One time password was sent to your gmail</Text> */}
            </View>
            <TextInput
              value={code}
              placeholder="Enter your verification code"
              placeholderTextColor={'#898989'}
              onChangeText={(code) => setCode(code)}
              style={styles.input}
            />
            <TouchableOpacity style={{backgroundColor:'#545AFF',width:'100%',padding:15,borderRadius:7,borderBottomWidth:4,borderBottomColor:'#444ADA'}} onPress={onVerifyPress}>
              <Text style={[{color:'#FFF',textAlign:'center',fontWeight:'600'}]}>Verify</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 ,backgroundColor:'#1A4656'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <SafeAreaView style={styles.safearea}>
          <View style={[styles.container,{justifyContent:'space-between',flex:1}]}>
            <View style={[styles.container,{marginTop:20}]}>
            <Text style={{ fontSize: 15, textAlign: 'left',width:'100%',fontWeight:'700',color:'#FFF'}}>Sign up</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                style={styles.input}
                placeholderTextColor={'#FFF'}
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                value={password}
                placeholder="Enter password"
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor={'#FFFF'}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            </View>
            <View style={{width:'100%',gap:20}}>
            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{borderColor: '#2B7691',backgroundColor:'none',borderWidth:1}]} onPress={()=>{router.back()}}>
              <Text style={[styles.buttonText,{color:'#2B7691'}]}>Sign In</Text>
            </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    paddingVertical: 20,
    borderRadius: 7,
    fontWeight:'600',
    color:'#FFF',
    backgroundColor:'#1D5367',
  },
  safearea: {
    paddingHorizontal: 20,
    flex: 1,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#131313',
    padding: 15,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
