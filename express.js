const express = require('express');
const app = express();
const path = require('path');

app.use(
    '/',
    express.static(path.join(__dirname, 'dist'), {
        setHeaders: res => {
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        },
    }),
);

app.listen(3000);
