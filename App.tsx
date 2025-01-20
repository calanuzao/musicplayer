// implements navigation structure

import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './src/screens/SearchScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { RootStackParamList } from './src/navigation/types';

type TabParamList = {
    SearchTab: undefined;
    FavoritesTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="SearchTab" 
                component={SearchScreen}
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Text style={{ color }}>🔍</Text>
                    ),
                }}
            />
            <Tab.Screen 
                name="FavoritesTab" 
                component={FavoritesScreen}
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Text style={{ color }}>❤️</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: true }}>
                        <Stack.Screen 
                            name="Search" 
                            component={MainTabs}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen 
                            name="Details" 
                            component={DetailsScreen}
                            options={{
                                title: 'Track Details'
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export default App;
