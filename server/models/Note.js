let notes = []; // In-memory storage for notes
let idCounter = 1; // Counter to generate unique IDs

/**
 * Schema for notes.
 * Specifies the field name, type, and if it's required.
 */
const noteSchema = {
    title: { type: "string", required: true },
    content: { type: "string", required: true },
    created_at: { type: 'string', required: false },
    updated_at: { type: 'string', required: false }
};

/**
 * The Note class represents a note with predefined fields.
 */
class Note {

    /**
     * Constructor for creating a new note.
     */
    constructor(fields) {
        this.id = idCounter++;
        this.data = this.validateFields(fields);
        this.data.created_at = new Date().toISOString();
        this.data.updated_at = this.data.created_at;
    }

    /**
     * Validates and assigns fields based on the schema.
     */
    validateFields(fields) {
        let validatedData = { ...this.data };

        for (const field in noteSchema) {
            const { type, required } = noteSchema[field];
            const value = fields[field];

            // Required check
            if (required && !value) {
                throw new Error(`${field} is required.`);
            }

            // Type check
            if (value !== undefined && typeof value !== type) {
                throw new Error(`${field} must be a ${type}.`);
            }

            // Assign valid value
            if (value !== undefined) {
                validatedData[field] = value;
            }
        }

        return validatedData;
    }

    /**
     * Creates a new note.
     */
    static create(fields) {
        try {
            const note = new Note(fields);
            notes.push(note);
            return note;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Retrieves all notes.
     * @returns {Array<Note>}
     */
    static findAll() {
        return notes;
    }

    /**
     * Finds a note by its ID
     */
    static findById(id) {
        return notes.find(note => note.id === parseInt(id)) || null;
    }

    /**
     * Updates an existing note by ID.
     */
    static update(id, fields) {
        const note = this.findById(id);
        if (!note) return null;

        try {
            const validatedFields = note.validateFields({ ...note.data, ...fields });
            note.data = validatedFields;

            note.data.updated_at = new Date().toISOString();

            return note;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Deletes a note by ID
     */
    static delete(id) {
        
        try {
            const index = notes.findIndex(note => note.id === parseInt(id));
            if (index === -1) return false;

            notes.splice(index, 1);
            
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Note;
