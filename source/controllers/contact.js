const Contact = require('../models/contactModel')

exports.index = (req, res) => {
    res.render('contact', {
        contato: {}
    });
}

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contatos/index'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => res.redirect(`/contatos/index/${contact.contact._id}`));
        return;

    } catch (e) {
        console.log(e);
        return res.render('error');
    }
};

exports.editIndex = async function (req,res) {
    if(!req.params.id) return res.render('error');

    const contato = await Contact.searchById(req.params.id);
    if(!contato) return res.render('error');

    res.render('contact', { contato })
};