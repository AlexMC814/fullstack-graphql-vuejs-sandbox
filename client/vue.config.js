module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                },
            ],
        },
        resolve: {
            extensions: ['.mjs', '.tsx', '.ts', '.js', '.jsx', '.json'],
        },
    },
};
