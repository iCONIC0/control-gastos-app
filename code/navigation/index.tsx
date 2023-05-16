/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { AuthProvider, useAuth } from '../Providers/AuthContext';
import ProfileScreen from '../screens/Auth/ProfileScreen';
import LoginScreen from '../screens/Login';
import NotFoundScreen from '../screens/NotFoundScreen';
import IncomesScreen from '../screens/Incomes/IncomesScreen';
import { LoginStackParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import IncomesForm from '../screens/Incomes/IncomesForm';
import ExpenseScreen from '../screens/Expenses/ExpenseScreen';
import ExpensesForm from '../screens/Expenses/ExpensesForm';
import HomeScreen from '../screens/HomeScreen';
import IncomesTypesForm from '../screens/Incomes/IncomesTypesForm';
import ExpensesTypesForm from '../screens/Expenses/ExpensesTypesForm';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList|LoginStackParamList>();

function RootNavigator() {
  const {signed,user} = useAuth();

  if(signed && user){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' , headerShown:false}}>
          <Stack.Screen name="IncomesAdd" component={IncomesForm} options={{ title:'Agregar Ingreso' }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' , headerShown:false}}>
          <Stack.Screen name="IncomesTypeAdd" component={IncomesTypesForm} options={{ title:'Agregar tipo de Ingreso' }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' , headerShown:false}}>
          <Stack.Screen name="ExpensesAdd" component={ExpensesForm} options={{ title:'Agregar Gasto' }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' , headerShown:false}}>
          <Stack.Screen name="ExpensesTypeAdd" component={ExpensesTypesForm} options={{ title:'Agregar Tipo de Gasto' }} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }else{
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const prof = (navigation:any) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="user-circle"
          size={25}
          color={'#000'}
          style={{ marginRight: 15 }}
        />
      </Pressable>
    )
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
      >
      <BottomTab.Screen
        name="Incomes"
        component={IncomesScreen}
        options={({ navigation }: RootTabScreenProps<'Incomes'>) => ({
          title: 'Ingresos',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons
            name="hand-coin-outline"
            size={25}
            color={color}
            style={{ marginRight: 15 }}
          />,
          headerRight: () => {return prof(navigation)} ,
        })}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => {return prof(navigation)} ,
        })}
      />
      <BottomTab.Screen
        name="Expenses"
        component={ExpenseScreen}
        options={({ navigation }: RootTabScreenProps<'Expenses'>) => ({
          title: 'Egresos',
          tabBarIcon: ({ color }) => <FontAwesome5
            name="hand-holding-usd"
            size={25}
            color={color}
            style={{ marginRight: 15 }}
          />,
          headerRight: () => {return prof(navigation)} ,
        })}
      />
      
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
function useReduxSelector(selectLogin: any) {
  throw new Error('Function not implemented.');
}

