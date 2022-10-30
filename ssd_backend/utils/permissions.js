const execute = require("../utils/queryExecuter");

const getPermission = async (userId) => {
  let query = `select p.title as title from rolepermission 
  rp right join permission p on rp.permissionId=p.id 
  where rp.roleId = (select roleId from users where id = ${userId})`;
  let result = await execute(query);
  result = result.map((item) => item.title);
  return result;
};

module.exports = getPermission;
