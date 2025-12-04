module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    'Expense',
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      purchase_item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'expenses',
      timestamps: true,
    }
  );

  return Expense;
};
