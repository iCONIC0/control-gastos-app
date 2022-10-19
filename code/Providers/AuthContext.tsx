import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import { logIn } from '../Services/ApiService';
import { View,ActivityIndicator, Alert } from 'react-native';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  login(formData:any): Promise<void>;
  signOut(): void;
  loading: boolean;

}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: any = ({children}:any) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
          const storageUser = await AsyncStorage.getItem('@reactNativeAuth:user');
          const storageToken = await AsyncStorage.getItem('@reactNativeAuth:token');
          await new Promise((resolve) => setTimeout(resolve, 2000));
          if (storageUser && storageToken) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
          }else{
            await AsyncStorage.removeItem('@reactNativeAuth:user');
            await AsyncStorage.removeItem('@reactNativeAuth:token');
            setUser(null);
            setLoading(false);
          }
        }
        loadStorageData();

      });
      async function signOut() {
        setLoading(true);
        await AsyncStorage.removeItem('@reactNativeAuth:user');
        await AsyncStorage.removeItem('@reactNativeAuth:token');
        setUser(null);
        setLoading(false);
        
    }
    async function login(formData:any) {

        const {status,data} = await logIn(formData);
        if(status){
          setUser(data.user);
          await AsyncStorage.setItem(
              '@reactNativeAuth:user',
              JSON.stringify(data.user),
          );
          await AsyncStorage.setItem('@reactNativeAuth:token', JSON.stringify({
            type:data.tokenType,
            token:data.token
          }));
        }else{
          Alert.alert(
            "Hubo un error.",
            data,
            [
              { text: "OK"}
            ]
          );
        }
        
        setLoading(false);
    }
    if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666" />
          </View>
      )
    }
  
    return (
        <AuthContext.Provider value={{
            signed: !!user, 
            user: user, 
            login,
            signOut,
            loading
        }}>
        {children}
        </AuthContext.Provider>
    );
};
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
