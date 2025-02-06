const express = require('express');
const router = express.Router();

const Note = require('../../models/Note');
const createResponse = require('../../Helpers/ResponseHelper');

/**
* @Route    GET api/notes
* @Desc     Get all notes
* @Author   Bipin Parmar
*/
router.get('/', async (req, res) => {
    try {
        const notes = await Note.findAll();
        
        res.status(200).json(createResponse(200, 'Notes retrieved successfully!', notes));
    } catch (error) {
        res.status(500).json(createResponse(500, 'Internal server error', error.message));
    }
});

/**
* @Route    POST api/notes
* @Desc     Save a new note
* @Author   Bipin Parmar
*/
router.post(
    '/',
    async (req, res) => {
        try {
            const note = await Note.create(req.body);

            res.status(201).json(createResponse(201, 'Note saved successfully!', note));
        } catch (error) {
            res.status(422).json(createResponse(422, error.message));
        }
    }
);

/**
* @Route    GET api/notes/:id
* @Desc     Get a note by ID
* @Author   Bipin Parmar
*/
router.get(
    '/:id',
    async (req, res) => {
        try {
            const note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).json(createResponse(404, 'Note not found'));
            }

            res.status(200).json(createResponse(200, 'Note retrieved successfully!', note));
        } catch (error) {
            res.status(500).json(createResponse(500, 'Internal server error', error.message));
        }
    }
);

/**
* @Route    PUT api/notes/:id
* @Desc     update a note by ID
* @Author   Bipin Parmar
*/
router.put('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.update(req.params.id, req.body);

        if (!updatedNote) {
            return res.status(404).json(createResponse(404, 'Note not found'));
        }

        res.status(200).json(createResponse(200, 'Note updated successfully!', updatedNote));
    } catch (error) {
        res.status(422).json(createResponse(422, error.message));
    }
});

/**
* @Route    DELETE api/notes/:id
* @Desc     Delete a note by ID
* @Author   Bipin Parmar
*/
router.delete('/:id', async (req, res) => {
    try {
        const success = await Note.delete(req.params.id);

        if (!success) {
            return res.status(404).json(createResponse(404, 'Note not found'));
        }

        res.status(200).json(createResponse(200, 'Note deleted successfully!'));
    } catch (error) {
        res.status(500).json(createResponse(500, 'Internal server error', error.message));
    }
});

module.exports = router;
