import * as Notification from "expo-notifications";

export async function getPushNotificationToken(): Promise<string | null> {
  const { granted } = await Notification.getPermissionsAsync();

  if (!granted) {
    await Notification.requestPermissionsAsync();
  }

  if (granted) {
    const { data: token } = await Notification.getExpoPushTokenAsync();
    console.debug("token", token);

    return token;
  }

  return null;
}
