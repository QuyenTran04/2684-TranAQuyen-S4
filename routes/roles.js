var express = require('express');
var router = express.Router();
let { dataRole, dataUser } = require('../utils/data2');

// Generate new role ID: r1, r2, r3 ...
function genRoleID() {
  const ids = dataRole.map(r => parseInt(r.id.replace('r', '')));
  return 'r' + (Math.max(...ids) + 1);
}


// Lấy tất cả roles
router.get('/', function (req, res, next) {
  res.json(dataRole);
});


// Lấy role theo id
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const role = dataRole.find(r => r.id === id);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }
  res.json(role);
});


// Lấy tất cả users thuộc role đó
router.get('/:id/users', function (req, res, next) {
  const id = req.params.id;
  const role = dataRole.find(r => r.id === id);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }
  const users = dataUser.filter(u => u.role.id === id);
  res.json(users);
});


// Tạo role mới
router.post('/', function (req, res, next) {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name is required' });
  }
  const newRole = {
    id: genRoleID(),
    name,
    description: description || '',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dataRole.push(newRole);
  res.status(201).json(newRole);
});

// ─── PUT /roles/:id ───────────────────────────────────────────────────────────
// Cập nhật role theo id
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  const role = dataRole.find(r => r.id === id);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }
  const { name, description } = req.body;
  if (name !== undefined) role.name = name;
  if (description !== undefined) role.description = description;
  role.updatedAt = new Date().toISOString();
  res.json(role);
});

// ─── DELETE /roles/:id ────────────────────────────────────────────────────────
// Xóa role theo id
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  const index = dataRole.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Role not found' });
  }
  const deleted = dataRole.splice(index, 1)[0];
  res.json({ message: 'Role deleted', data: deleted });
});

module.exports = router;
