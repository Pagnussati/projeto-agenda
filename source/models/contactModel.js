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
    this.contact =null
}

Contact.searchById = async (id) => {
    if (typeof id !== 'String') return;
    const user = await ContactModel.findById(id);
    return user;
};

Contact.prototype.register =async function() {
    this.validate();
    if(this.errors.lenght > 0) return;
    await ContactModel.create(this.body)
};

Contact.prototype.validate = function() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail');
    if (this.body.nome) this.errors.push('Name is an required field');
    if (this.body.email && this.body.telefone) this.errors.push('Email or Telephone might be filled');
    //if (this.body.password.length < 3 || this.body.password.length >= 50) this.errors.push('Password between 3 and 50 characters')
}

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
}

module.exports = Contact;