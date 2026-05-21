// Config data-access methods using Sequelize.
// Reads the first (and only) row in the configs table.

const { Config } = require('./index');

const ConfigModel = {
  getActiveSemester: async () => {
    const config = await Config.findOne({ raw: true });
    if (!config || !config.enrollmentOpen) return null;
    return config.activeSemester;
  },

  getDeadline: async (type) => {
    const config = await Config.findOne({ raw: true });
    if (!config) return null;
    const map = {
      enrollment: config.enrollmentDeadline,
      addDrop: config.addDropDeadline,
      payment: config.paymentDeadline,
    };
    return map[type] || null;
  },

  get: async () => {
    return Config.findOne({ raw: true });
  },
};

module.exports = ConfigModel;
