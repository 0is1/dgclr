const env = require('./env-config');
module.exports = {
    env: {
        development: {
            presets: ['next/babel'],
            plugins: [
                [
                    'styled-components',
                    {
                        ssr: true,
                        displayName: true,
                        preprocess: false,
                    },
                ],
            ],
        },
        production: {
            presets: ['next/babel'],
            plugins: [
                [
                    'styled-components',
                    {
                        ssr: true,
                        displayName: true,
                        preprocess: false,
                    },
                ],
            ],
        },
        test: {
            presets: [
                [
                    'env',
                    {
                        modules: 'commonjs',
                    },
                ],
                'next/babel',
            ],
            plugins: [
                [
                    'styled-components',
                    {
                        ssr: true,
                        displayName: true,
                        preprocess: false,
                    },
                ],
            ],
        },
    },
    plugins: [
        [
            'styled-components',
            {
                ssr: true,
                displayName: true,
                preprocess: false,
            },
        ],
        [
            'module-resolver',
            {
                root: ['./'],
            },
        ],
        ['transform-define', env],
    ],
};
