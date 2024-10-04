import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesScreen from '../screens/MoviesScreen';
import TVShowsScreen from '../screens/TVShowsScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { textTransform: 'none' },
          }} >
            <Tab.Screen name="Movies" component={MoviesScreen} />
            <Tab.Screen name="Search Results" component={SearchScreen} />
            <Tab.Screen name="TV Shows" component={TVShowsScreen} />
        </Tab.Navigator>
    );
}

export default function AppStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="MainTabs"
                    component={TabNavigator}
                    options={{
                        title: 'Movies App',
                        headerStyle: {
                            backgroundColor: '#2c3e50'
                        },
                        headerTitleStyle: {
                            color: '#fff'
                        }
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={({ route }) => ({
                        title: route.params.mediaTitle,
                        headerBackTitle: "Back to List",
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                        headerTitleStyle: {
                            color: '#000',
                        },
                        headerTintColor: '#007AFF',
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}