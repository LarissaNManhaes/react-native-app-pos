import { useContext } from "react";
import Home from "../Home";
import Login from "../Login";
import Register from "../Register";
import UserContext from "../../context/user";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function Wrapper() {
  const userData = useContext(UserContext);
  
  return userData.user != null ? (
    <Home />
  ) : (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}
