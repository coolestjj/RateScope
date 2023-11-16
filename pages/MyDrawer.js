import { createDrawerNavigator } from '@react-navigation/drawer';
import Overview from "./Overview";
import Personal from "./Personal";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Personal} />
            <Drawer.Screen name="Overview" component={Overview} />
        </Drawer.Navigator>
    );
}