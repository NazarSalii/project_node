const {Router} = require('express');
const weaponController = require('../controllers/weapon-controller');
const router = Router();

// pages
router.get('/main', weaponController.getWeapon);
router.get('/create', weaponController.getCreate);
router.get('/update', weaponController.getUpdate);
router.get('/delete', weaponController.getDelete);

// CREATE
router.post('/create', weaponController.createWeapon);
// DELETE
router.post('/delete/:id', weaponController.deleteWeapon);
// UPDATE
router.post('/update/:id', weaponController.updateWeapon);

module.exports = router;