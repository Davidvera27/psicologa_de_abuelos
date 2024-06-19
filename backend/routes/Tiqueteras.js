const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Importar con la capitalización correcta
const Tiquetera = require('../models/Tiquetera'); // Importar con la capitalización correcta

// @route    GET api/tiqueteras
// @desc     Get all tiqueteras
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const tiqueteras = await Tiquetera.find({ usuario: req.user.id });
    res.json(tiqueteras);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/tiqueteras
// @desc     Create a tiquetera
// @access   Private
router.post('/', auth, async (req, res) => {
  const { tipo, dias, fechaInicio, fechaFin } = req.body;

  try {
    const newTiquetera = new Tiquetera({
      tipo,
      dias,
      usuario: req.user.id,
      fechaInicio,
      fechaFin
    });

    const tiquetera = await newTiquetera.save();
    res.json(tiquetera);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/tiqueteras/:id
// @desc     Update a tiquetera
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { tipo, dias, fechaInicio, fechaFin } = req.body;

  try {
    let tiquetera = await Tiquetera.findById(req.params.id);

    if (!tiquetera) return res.status(404).json({ msg: 'Tiquetera not found' });

    // Ensure user owns tiquetera
    if (tiquetera.usuario.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    tiquetera.tipo = tipo || tiquetera.tipo;
    tiquetera.dias = dias || tiquetera.dias;
    tiquetera.fechaInicio = fechaInicio || tiquetera.fechaInicio;
    tiquetera.fechaFin = fechaFin || tiquetera.fechaFin;

    await tiquetera.save();
    res.json(tiquetera);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/tiqueteras/:id
// @desc     Delete a tiquetera
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let tiquetera = await Tiquetera.findById(req.params.id);

    if (!tiquetera) return res.status(404).json({ msg: 'Tiquetera not found' });

    // Ensure user owns tiquetera
    if (tiquetera.usuario.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await tiquetera.remove();
    res.json({ msg: 'Tiquetera removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
