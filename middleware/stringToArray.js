//Original intention of this middleware is to split strings and create an array out of it, strings are delimited by + or spaces

const stringToArray = () => (req,res,next) => {
    const items = req.query;

    console.log(items);
    console.log(typeof items);

    if (typeof items === 'object' && items !== null) {
        Object.keys(items).forEach(key => {
            if (key === 'platform') {
                items[key] = items[key].split(" ");
            }
        });
        req.query = items;
    }

    next();
};

module.exports = stringToArray;