module.exports = {
    plugins: [
        [
            "postcss-preset-env",
            {
            }
        ],
        [
            "postcss-import",
            {
                path: './src/styles'
            }
        ],
        [
            "postcss-simple-vars",
            {
            }
        ]
    ]
};
