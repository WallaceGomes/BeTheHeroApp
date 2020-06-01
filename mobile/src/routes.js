import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// StackNavigator é usado para criar navegação entre páginas por meio de botões
// pode ser criada navegação por meio de menus, porém é outra biblioteca
// consultar https://reactnavigation.org/docs/getting-started
const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Details" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
