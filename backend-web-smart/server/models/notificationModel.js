// Notification data-access methods using Sequelize.

const { Notification } = require('./index');

const NotificationModel = {
  getByStudent: async (studentId) => {
    return Notification.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']],
      raw: true,
    });
  },

  markAsRead: async (id) => {
    await Notification.update({ isRead: true }, { where: { id } });
    return Notification.findByPk(id, { raw: true });
  },
};

module.exports = NotificationModel;
