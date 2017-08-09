const debug = require('debug')('krimzen-ninja-express-error-handling');
/**
 * This function says hello.
 * @param name Some name to say hello to.
 * @returns {string} The hello message.
 */
const sayHello = (name = 'World') => {
    debug('say hello called with %s', name);
    return `Hello, ${name}!`;
};

export default sayHello;
