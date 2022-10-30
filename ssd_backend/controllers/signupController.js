const execute = require("../utils/queryExecuter");
//POST SignUp Method
const signUp = async (req, res, next) => {
  const { body } = req;
  console.log(body);
  if (!body.userName || !body.passWord || !body.role)
    return res
      .status(500)
      .json({ message: "Please fill all data and try again" });
  const isUnique = await checkUniqueUsername(body.userName);
  if (!isUnique)
    return res.json({ message: "Please select a unique username" });
  const isValidPassword = await checkPassword(body.passWord);
  if (!isValidPassword)
    return res.json({ message: "Password should be alpha numeric" });
  const roleId = await getRoleId(body.role);
  if (roleId === 0) return res.json({ message: "Invalid role selected" });

  const isUserAdded = await addNewUser(body.userName, body.passWord, roleId);
  if (isUserAdded)
    return res.status(200).json({ message: "User added successfully" });
  res.status(500).json({ message: "Unable to add user" });
};

const checkUniqueUsername = async (userName) => {
  const query = `select username from users where username='${userName}'`;
  let result = await execute(query);

  if (result.length > 0) return false;
  return true;
};

const getRoleId = async (role) => {
  let roleId = await execute(`select id from role where title='${role}'`);
  roleId = roleId.length ? roleId[0].id : 0;

  return roleId;
};

const addNewUser = async (userName, passWord, roleId) => {
  let query = `insert into users (username,password,roleId) values ('${userName}',md5('${passWord}'),${roleId})`;
  let result = await execute(query);

  if (result.affectedRows > 0) return true;
  return false;
};

const checkPassword = async (passWord) => {
  var letter = /[a-zA-Z]/;
  var number = /[0-9]/;
  var isValid = number.test(passWord) && letter.test(passWord);
  return isValid;
};
module.exports = signUp;
