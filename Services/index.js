import {Permission , Notifications } from 'expo';
const registerForPushNotificationsAsync = async () =>{
    

      const { status: existingStatus } = await Permission.getAsync(
        Permission.NOTIFICATIONS

      );
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permission.askAsync(
            Permission.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
     let token = await Notifications.getExpoPushTokenAsync()
      console.log(token);
   
  

  
};


export {registerForPushNotificationsAsync}