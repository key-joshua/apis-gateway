import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('sessions', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER , allowNull: false, references:{ model: 'users', key: 'id' }},
    deviceId: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING },
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('sessions') }, }