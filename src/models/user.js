export default (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true,
            },
            email:{
                type:DataTypes.STRING
            },
            password:{
                type:DataTypes.STRING
            },
            email_verified:{
                type:DataTypes.DATE,
            }
        },
        {
            sequelize,
            modeName: 'users',
            freezeTableName:true,
        }
    );
    return users;
};