import { createDrawerNavigator } from '@react-navigation/drawer';
import Details from './screens/details';
import Home from './screens/home';
import Profile from './screens/profile';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Detail" component={Details} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function App(){
    return(
        <MyDrawer/>
    )
}