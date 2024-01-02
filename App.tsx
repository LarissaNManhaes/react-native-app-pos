
import UserContext, { IUser, storage } from './src/context/user';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { useEffect, useState } from "react";

import { login } from './src/services/auth';
import Wrapper from "./src/screens/Wrapper";
import Home from "./src/screens/Home";
import THEME from './src/theme';


export default function App() {
  const Stack = createStackNavigator();
  
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (user != null) {
      storage.set("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const userDb = storage.getString("user");
    if (userDb) {
      setUser(JSON.parse(userDb)); 
      
      login({name: userDb.name, password: userDb.password})
        .then((res) => {})
        .catch((erro) => {
          if(erro.message.indexOf("401") >= 0){
            storage.delete("user");
          }
        })
    }   
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <UserContext.Provider value={{ user: user, setUser }}>
        <StatusBar barStyle={"dark-content"} />
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Wrapper' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Wrapper' component={Wrapper} />
            <Stack.Screen name='Home' component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
