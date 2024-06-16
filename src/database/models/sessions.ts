import { Model } from 'sequelize'

interface SessionInterface {
    userId: number,
    deviceId: string,
    token: string,
    createdAt: Date;
    updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class sessions extends Model<SessionInterface> 
        implements SessionInterface {
            declare userId: number;
            declare deviceId: string;
            declare token: string;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models: any) {
                sessions.belongsTo(models.users, { as: 'user', foreignKey: 'userId' })
            }
        }
    
    sessions.init(
        {
            userId: { type: DataTypes.INTEGER },
            deviceId: { type: DataTypes.STRING },
            token: { type: DataTypes.STRING },
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'sessions',
            tableName: 'sessions',
        }
    )

    return sessions
}