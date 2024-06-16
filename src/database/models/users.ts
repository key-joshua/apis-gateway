import { Model } from 'sequelize'

export interface UsersInterface {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<UsersInterface> 
        implements UsersInterface {
            declare username: string;
            declare email: string
            declare password: string;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models: any) {
                users.hasMany(models.sessions, { as: 'session', foreignKey: 'userId' })
            }
        }
    
    users.init(
        {
            username: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'users',
            tableName: 'users',
        }
    )

    return users
}