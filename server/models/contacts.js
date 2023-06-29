module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkPreference: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    deletedAt: {
      type: 'TIMESTAMP',
      defaultValue: null,
      allowNull: true,
    },
  });
  return Contacts;
};
