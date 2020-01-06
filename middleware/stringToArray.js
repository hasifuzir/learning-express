const stringToArray = () => (req,res,next) => {
    const items = req.query;

    Object.keys(items).forEach(key => {
        if (key === 'platform') {
            items[key] = items[key].split(" ");
        }
    });
    req.query = items;

    next();
};

module.exports = stringToArray;