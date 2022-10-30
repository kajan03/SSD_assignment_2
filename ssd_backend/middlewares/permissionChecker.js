const getUserPermission = require("../utils/permissions");
const Mapper = require("../utils/permissionsTypes");
const checkUserPermission = async (req, res, next) => {
  const userId = req.user;
  const method = req.method;
  const userPermissions = await getUserPermission(userId);

  if (userPermissions.includes(Mapper[method])) next();
  else res.status(401).json({ message: "Not authorized to access endpoint" });
};

module.exports = checkUserPermission;
