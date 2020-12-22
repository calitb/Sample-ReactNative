import 'react-native-gesture-handler';

import { AppState, AppStateStatus } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export default function useAppState(): AppStateStatus {
  const appStateRef = useRef(AppState.currentState);
  const [appState, setAppState] = useState(appStateRef.current);
  function _handleAppStateChange(nextState: AppStateStatus) {
    setAppState(nextState)
  }

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  return appState;
}