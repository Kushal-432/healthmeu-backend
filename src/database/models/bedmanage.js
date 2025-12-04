const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bedmanage extends Model {
    static associate(models) {
      // Bedmanage belongs to Bedtype
      Bedmanage.belongsTo(models.Bedtype, {
        foreignKey: 'bedtype_id',
        as: 'bedtype',
        onDelete: 'CASCADE',
      });

      // Bedmanage belongs to Bedlocation
      Bedmanage.belongsTo(models.Bedlocation, {
        foreignKey: 'bedlocation_id',
        as: 'bedlocation',
        onDelete: 'CASCADE',
      });
    }
  }

  Bedmanage.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      bed_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      daily_rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      bedtype_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bedlocation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bedmanage',
      tableName: 'bedmanages',
      timestamps: true,
    }
  );

  return Bedmanage;
};
