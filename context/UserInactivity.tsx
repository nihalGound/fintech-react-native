import { View, Text, AppState, AppStateStatus } from "react-native";
import React, { useEffect, useRef } from "react";
import { MMKV } from "react-native-mmkv";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const storage = new MMKV({
  id: "inactivity-storage",
});

const UserInactivityProvider = ({ children }: { children: React.ReactNode }) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  });

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      if (elapsed > 3000 && isSignedIn) {
        router.replace("/(authenticated)/(modals)/lock");
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return  children;
};

export default UserInactivityProvider;
