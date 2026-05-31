const Contact = require('../models/Contact');

exports.addContact = async (req, res) => {
  try {
    const { firstName, lastName, role, company, email, phone, tags } = req.body;

    // Server-side strict validation check
    if (!firstName) {
      return res.status(400).json({ message: 'First name is required.' });
    }

    // Persist contact record linked directly to authenticated token identity
    const newContact = await Contact.create({
      firstName,
      lastName,
      role,
      company,
      email,
      phone,
      tags,
      userId: req.user.id 
    });

    return res.status(201).json(newContact);
  } catch (error) {
    // Gracefully handle validation/formatting errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};