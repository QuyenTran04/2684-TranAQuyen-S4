var express = require('express');
var router = express.Router();
let { dataUser, dataRole } = require('../utils/data2');

// Tìm role theo id
function findRole(roleId) {
  return dataRole.find(r => r.id === roleId);
}


router.get('/', function (req, res, next) {
  res.json(dataUser);
});


// Lấy user theo username
router.get('/:username', function (req, res, next) {
  const username = req.params.username;
  const user = dataUser.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});


// Tạo user mới
router.post('/', function (req, res, next) {
  const { username, password, email, fullName, avatarUrl, status, roleId } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'username, password, email are required' });
  }

  // Kiểm tra username trùng
  const exists = dataUser.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  // Gán role
  let roleObj = findRole(roleId);
  if (!roleObj && roleId) {
    return res.status(404).json({ message: 'Role not found' });
  }
  if (!roleObj) {
    roleObj = dataRole.find(r => r.name === 'Người dùng') || dataRole[dataRole.length - 1];
  }

  const newUser = {
    username,
    password,
    email,
    fullName: fullName || '',
    avatarUrl: avatarUrl || '',
    status: status !== undefined ? status : true,
    loginCount: 0,
    role: {
      id: roleObj.id,
      name: roleObj.name,
      description: roleObj.description
    },
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dataUser.push(newUser);
  res.status(201).json(newUser);
});


// Cập nhật user theo username
router.put('/:username', function (req, res, next) {
  const username = req.params.username;
  const user = dataUser.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password, email, fullName, avatarUrl, status, loginCount, roleId } = req.body;

  if (password !== undefined) user.password = password;
  if (email !== undefined) user.email = email;
  if (fullName !== undefined) user.fullName = fullName;
  if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
  if (status !== undefined) user.status = status;
  if (loginCount !== undefined) user.loginCount = loginCount;

  if (roleId !== undefined) {
    const roleObj = findRole(roleId);
    if (!roleObj) {
      return res.status(404).json({ message: 'Role not found' });
    }
    user.role = {
      id: roleObj.id,
      name: roleObj.name,
      description: roleObj.description
    };
  }

  user.updatedAt = new Date().toISOString();
  res.json(user);
});


// Xóa user theo username
router.delete('/:username', function (req, res, next) {
  const username = req.params.username;
  const index = dataUser.findIndex(u => u.username === username);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deleted = dataUser.splice(index, 1)[0];
  res.json({ message: 'User deleted', data: deleted });
});

module.exports = router;
