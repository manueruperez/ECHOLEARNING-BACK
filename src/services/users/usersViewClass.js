const mariadb = require('../db');

class UsersViewClass{

    async getUsers(data) {
        try {
            let conn = await mariadb.getConn();
            const rows = await conn.query(
                `
                select
                    tu.nombres ,
                    tu.apellidos ,
                    tu.email
                from tbl_users tu
                order by tu.apellidos
                `
                );
            conn.end();
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(data) {
        try {
            let conn = await mariadb.getConn();
            const rows = await conn.query(`
            select
                tu.nombres ,
                tu.apellidos ,
                tu.email
            from tbl_users tu
            where tu.idtbl_user = ?`,data);
            conn.end();
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UsersViewClass;