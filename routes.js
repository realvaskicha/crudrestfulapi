const router = require('express').Router();
const assetsController = require('./controllers/assetsController.js');

router.post(
    '/asset',
    assetsController.insert
    );

router.get(
    '/asset',
    assetsController.getAllAssets
    );

router.get(
    '/asset/:id',
    assetsController.getAssetByID
    );

router.patch(
    '/asset/:id',
    assetsController.updateAsset
    );

router.delete(
    '/asset/:id',
    assetsController.deleteAsset
    );

module.exports = router;