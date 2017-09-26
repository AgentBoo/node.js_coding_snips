const express = require('express'),
      snipsController = require('./../controllers/snipsController');



// NOTE: Express router
const router = express.Router();

// router.post('/', (req, res) => res.redirect('/snips/' + req.user._id))

router.get('/:id', snipsController.index, (req, res) =>
   res.render('mysnips', {
       'snips' : req.snips })
);

router.post('/:id', (req, res) => res.redirect('/create/snippet')
);

router.get('/create/snippet', (req, res) =>
   res.render('mysnippet')
);

router.post('/create/snippet', snipsController.create, (req, res) =>
   res.redirect('/snips/')
);


router.post('/edit/snippet/:id', snipsController.edit, (req, res) =>
   res.render('editsnippet', {
       'snip' : req.snip })
);

router.post('/delete/snippet/:id', snipsController.destroy, (req, res) =>
   res.redirect('/snips/' + req.user._id)
);


module.exports = router;
