module.exports = (sequelize, DataTypes) => {
  const Bedtype = sequelize.define(
    'Bedtype',
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      bed_type_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      base_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: 'bedtypes',
      timestamps: true,
    }
  );

  return Bedtype;
};
