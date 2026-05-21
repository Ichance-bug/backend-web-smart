// Notifications controller.
// getNotifications — fetch all notifications for the authenticated student
// markRead         — mark a specific notification as read

const NotificationModel = require('../models/notificationModel');
const { success, error } = require('../utils/response');

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await NotificationModel.getByStudent(req.user.id);
    return success(res, notifications);
  } catch (err) {
    next(err);
  }
};

const markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await NotificationModel.markAsRead(id);

    if (!notification) {
      return error(res, 'Notification not found', 404);
    }

    return success(res, notification, 'Notification marked as read');
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotifications, markRead };
