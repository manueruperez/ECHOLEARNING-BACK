const mariadb = require('../db');

class UsersTransaccionalClass {
    async createUser(data) {
        try {
            let conn = await mariadb.getConn();
            const rows = await conn.query(
                `
                insert into users ( 
                    name,
					last_name,
					sexo,
					phone,
					identification,
					identification_type,
					birthday,
					email,
					email_verified_at,
					password,
					two_factor_recovery_codes,
					remember_token,
					current_team_id,
					profile_photo_path,
					created_at,
					updated_at) 
                values (
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?	
                );
                `, [
                    data.name,
                    data.last_name,
                    data.sexo,
                    data.phone,
                    data.identification,
                    data.identification_type,
                    data.birthday,
                    data.email,
                    data.email_verified_at,
                    data.password,
                    data.two_factor_recovery_codes,
                    data.remember_token,
                    data.current_team_id,
                    data.profile_photo_path,
                    data.created_at,
                    data.updated_at,
                ]
            );
            conn.end();
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

    async upDateUser(data) {
        try {
            let conn = await mariadb.getConn();
            const rows = await conn.query(
                `
                update
                    tbl_users tu
                set 
                    tu.nombres = ?,
                    tu.apellidos = ?,
                    tu.email = ?
                where tu.idtbl_user = ?;
                `, [
                    data.nombres,
                    data.apellidos,
                    data.email,
                    data.idUsuario,
                ]
            );
            conn.end();
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(data) {
        try {
            let conn = await mariadb.getConn();
            const rows = await conn.query(
                `
                delete from tbl_users
                where idtbl_user = ?;
                `,
                data
            );
            conn.end();
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UsersTransaccionalClass;