// Document data-access methods using Sequelize.

const { Document } = require('./index');

const DocumentModel = {
  getByStudent: async (studentId) => {
    return Document.findAll({ where: { studentId }, raw: true });
  },

  create: async (data) => {
    return Document.create(data);
  },

  updateStatus: async (id, status) => {
    await Document.update({ status }, { where: { id } });
    return Document.findByPk(id, { raw: true });
  },

  findAll: async () => {
    return Document.findAll({ raw: true });
  },
};

module.exports = DocumentModel;
