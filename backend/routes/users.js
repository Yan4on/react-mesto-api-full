const router = require('express').Router(); // создали роутер
const { userIdValidation, updateUserProfileValidation, updateUserAvatarValidation } = require('../validation/userValidation');
const {
  getUsers, getUserId, getCurrentUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', userIdValidation, getUserId);
router.patch('/me', updateUserProfileValidation, updateUserProfile);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
