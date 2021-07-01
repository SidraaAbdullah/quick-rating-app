import React, { useContext, useReducer, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
import axios from 'axios';
import { getAsyncStorageValues } from './src/constants';
import AppLoading from 'expo-app-loading';

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [appVisited, setAppVisited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { manager_details = {} } = await getAsyncStorageValues();
      const { AppVisited } = await getAsyncStorageValues();
      setAppVisited(AppVisited.appVisited || false);
      setLoading(false);
      if (manager_details?.token)
        axios.defaults.headers.common.Authorization = `Bearer ${manager_details?.token}`;
    })();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootNavigator appVisited={appVisited} />
      </NavigationContainer>
    </Context.Provider>
  );
}
