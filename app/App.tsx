import React, { useEffect, useRef } from "react";

import { StatusBar } from "react-native";
import { Background } from "./src/components/Background";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import Toast from "react-native-root-toast";
import * as Notification from "expo-notifications";

import "./src/services/notifications-config";
import { getPushNotificationToken } from "./src/services";
import { Subscription } from "expo-modules-core";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notification.addNotificationReceivedListener((notification) => {
        console.log("Notification received", notification);
      });

    responseNotificationListener.current =
      Notification.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received", response);
      });

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notification.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notification.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  return (
    <>
      <Background>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded ? <Routes /> : <Loading />}
      </Background>
      <Toast style={{ zIndex: 999 }} />
    </>
  );
}
