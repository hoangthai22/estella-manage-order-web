import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
export const createNotification = (type, message) => {
    switch (type) {
        case "info":
            NotificationManager.info(message);
            break;
        case "success":
            NotificationManager.success(message, "", 3000);
            break;
        case "warning":
            NotificationManager.warning(message, "", 3000);
            break;
        case "error":
            NotificationManager.error("Error message", "Click me!", 5000, () => {
                alert("callback");
            });
            break;
        default:
            break;
    }
};
