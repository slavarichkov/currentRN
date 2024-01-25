import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';


const getFcmToken = async () => {
  let token = null;

  try {
    const isPermissionGranted = await checkApplicationNotificationPermission();
    console.log('Checking permission', isPermissionGranted);
    if (isPermissionGranted) {
      await registerAppWithFCM();
      token = await messaging().getToken();
      console.log(`getFcmToken--> ${token}`);
    } else {
      console.log('Notification permission not granted.');
    }
  } catch (error) {
    console.error('getFcmToken error:', error);
  }

  return token;
};


// Выполняет регистрацию устройства для получения удаленных уведомлений с использованием Firebase Cloud Messaging (FCM)
async function registerAppWithFCM() {
  try {
    console.log('Checking registration status for remote messages...');
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      console.log('Registering device for remote messages...');
      const status = await messaging().registerDeviceForRemoteMessages();
      console.log('Registration status for remote messages:', status);
    } else {
      console.log('Device is already registered for remote messages.');
    }
  } catch (error) {
    console.error('Error registering device for remote messages:', error);
    // Можно предпринять дополнительные действия по обработке ошибок здесь
  }
}

// метод выполняет отмену регистрации устройства для получения удаленных 
export async function unRegisterAppWithFCM() {
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log('unregisterDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
}

// метод получает разрешение на получение уведомлений
const checkApplicationNotificationPermission = async () => {
  try {
    let authStatus = await messaging().requestPermission();
    if (Platform.OS === 'android') {
      authStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
    console.log('Authorization status:', authStatus);
    return true;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

// устанавливает обработчики событий для получения уведомлений и отслеживания действий пользователя по отношению к уведомлениям
function registerListenerWithFCM() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('onMessage Received : ', JSON.stringify(remoteMessage));
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'onNotificationOpenedApp Received',
      JSON.stringify(remoteMessage),
    );
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export {
  getFcmToken, // Получить токен FMC
  registerListenerWithFCM, // устанавливает обработчики событий для получения уведомлений и отслеживания действий пользователя по отношению к уведомлениям
}