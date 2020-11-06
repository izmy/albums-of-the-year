const express = require('express');

const router = express.Router();

const data = [
  {
    id: 1,
    name: '1000',
    year: 2019,
  },
  {
    id: 2,
    name: 'Černobílej svět',
    year: 2019,
  },
]

router.get('/', (req, res, next) => {
  res.json(data);
});

router.get('/:id', (req, res, next) => {
  const albumId = req.params.id;
  const album = data.find(album => album.id == albumId);
  res.json(album);
});

module.exports = router;