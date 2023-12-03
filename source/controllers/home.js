exports.home = (req, res) => {
    res.render('index', {
        titulo: 'Isso ae',
        numeros: [77, 65, 99],
    });
    return;
};

exports.homePost = (req, res) => {
    res.send('Oi!')
}