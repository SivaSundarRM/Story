const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/place-controller');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
// GET /api/places/:pid — Get place by ID
router.get('/:pid', placesControllers.getPlaceById);

// GET /api/places/user/:uid — Get places by user ID
router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.use(checkAuth);

// POST /api/places — Create a new place
router.post(
  '/', fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
    check('creator').not().isEmpty() // ✅ Added validation for creator
  ],
  placesControllers.createPlace
);

// PATCH /api/places/:pid — Update an existing place
router.patch(
  '/:pid',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

// DELETE /api/places/:pid — Delete a place
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
