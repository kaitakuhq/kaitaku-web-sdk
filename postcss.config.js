
const prefixSelector = require('postcss-prefix-selector');

const container = '#kaitaku-feedback-ui'

module.exports = {
    plugins: [
        require('tailwindcss'),
        prefixSelector({
            prefix: container + ' ',
            exclude: [
                /\[/, // starts with [ (e.g. [role])
            ],

            // Optional transform callback for case-by-case overrides
            transform: function (prefix, selector, prefixedSelector) {
                console.log("Prefix:", prefix, ", selector:", selector, ", prefixedSelector:", prefixSelector)

                // mainly for font stuff
                if (selector === 'html') {
                    return prefix + "*"
                }

                // root identifier
                if (selector === container) {
                    return container
                }

                return prefix + selector;
            }
        }),
    ]
}