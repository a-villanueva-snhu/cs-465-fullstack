/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways', active: 'home' });
};

/* GET Rooms page */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways - Rooms', active: 'rooms' });
};

/* GET News page */
const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaways - News', active: 'news' });
};

/* GET About page */
const about = (req, res) => {
    res.render('about', { title: 'Travlr Getaways - About', active: 'about' });
};

/* GET Contact page */
const contact = (req, res) => {
    res.render('contact', { title: 'Travlr Getaways - Contact', active: 'contact' });
};

module.exports = {
    index,
    rooms,
    news,
    about,
    contact
};