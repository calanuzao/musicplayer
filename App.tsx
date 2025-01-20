// implements navigation structure

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/searchscreen';
import DetailsScreen from './src/screens/detailscreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Search">
                        <Stack.Screen 
                            name="Search" 
                            component={SearchScreen}
                            options={{
                                title: 'Music Search'
                            }}
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
};

export default App;
