import React, { useContext, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
import axios from 'axios';
import { getAsyncStorageValues } from './src/constants';

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    (async () => {
      const { manager_details={} } = await getAsyncStorageValues();
      if (manager_details?.token)
        axios.defaults.headers.common.Authorization = `Bearer ${manager_details?.token}`;
    })();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
