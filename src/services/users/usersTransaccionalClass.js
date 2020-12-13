const mariadb = require('../db');

class UsersTransaccionalClass{
    async createUser(data) {
        try {
            let conn = await mariadb.getConn();
            const rows = await conn.query(
                `
                insert
                into tbl_users (nombres,apellidos,email,estado)
                values(?,?,?,1);
                `,
                [
                    data.nombres,
                    data.apellidos,
                    data.email,
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
                `,
                [
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