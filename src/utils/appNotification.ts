import { Express } from "express";
import Notification from "../repository/notification";

let notification: Notification;

/**
 * Configure the app notification system.
 * @param app - The express app instance.
 *
 * Configures the Notification class with the express app instance.
 * @example
 * import express from "express";
 * import { appNotification } from "../utils/appNotification";
 * const app = express();
 * appNotification(app);
 */
export const appNotification = (app: Express) => {
  notification = new Notification(app, "notification");
};

/**
 * Send a notification to a specific user connected to the SSE stream.
 * @param userId - The user ID to receive the notification.
 * @param message - The message to be sent to the user.
 */
export const sendNotificationToUser = (userId: string, message: any) => {
  notification.sendNotificationToUser(userId, message);
};

/**
 * Send a notification to specific users connected to the SSE stream.
 * @param userIds - A list of user IDs to receive the notification.
 * @param message - The message to be sent to the users.
 */
export const sendNotificationToUsers = (userIds: string[], message: any) => {
  notification.sendNotificationToUsers(userIds, message);
};

/**
 * Send notification to all users connected to the SSE stream.
 * @param message - The message to be sent to all users.
 */
export const sendNotificationToAll = (message: any) => {
  notification.sendNotificationToAll(message);
};

export const sendThreadNotification = (message: any) => {};
