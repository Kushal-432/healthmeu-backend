module.exports = (sequelize, DataTypes) => {
  const Bedlocation = sequelize.define(
    'Bedlocation',
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      bed_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      floor_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wing: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'bedlocations',
      timestamps: true,
    }
  );

  return Bedlocation;
};
