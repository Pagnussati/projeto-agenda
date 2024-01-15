const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false, default:'' },
    email: { type: String, required: false, default:'' },
    telephone: { type: String, required: false, default:'' },
    createDate: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body){
    this.body = body;
    this.errors = [];
    this.contact = null
}

Contact.prototype.register = async function() {
    this.validate();

    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validate = function() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido!');
    if (!this.body.name) this.errors.push('Nome deve ser preenchido');
    if (!this.body.email && !this.body.telephone) {
        this.errors.push('Email ou telefone deve ser preenchido');
    };
};

Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.nome,
        lastName: this.body.sobrenome,
        email: this.body.email,
        telephone: this.body.telefone,
        
    };
};

Contact.searchById = async function(id){
    if (typeof id !== 'string') return;
    const contato = await ContactModel.findById(id);
    return contato;
}; 

Contact.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contato = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  };

module.exports = Contact;