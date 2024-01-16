const Contacts = require('../models/contactModel');

exports.index = async (req, res) => {
    const contacts = await Contacts.searchContacts();
    res.render('index', { contacts });
    return;
};