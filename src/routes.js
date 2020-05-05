import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Profissionais próximos"
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Perfil do profissional"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#444",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#f9f9f9"
          //backgroudColor: '#7D40E7',
        }
      }
    }
  )
);

export default Routes;
