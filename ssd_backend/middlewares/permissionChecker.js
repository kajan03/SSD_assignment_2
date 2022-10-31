const getUserPermission = require("../utils/permissions");
const Mapper = require("../utils/permissionsTypes");
const checkUserPermission = async (req, res, next) => {
  const userId = req.user;
  const userPermissions = await getUserPermission(userId);
  
  next();
};

module.exports = checkUserPermission;
