/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  IncomesAdd: undefined;
  ExpensesAdd: undefined;
  Modal: undefined;
  NotFound: undefined;
};
export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  Restore: undefined;
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
export type LoginStackScreenProps<Screen extends keyof LoginStackParamList> = NativeStackScreenProps<
  LoginStackParamList,
  Screen
>;

export type RootTabParamList = {
  Incomes: undefined;
  Expenses: undefined;
  Home: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
