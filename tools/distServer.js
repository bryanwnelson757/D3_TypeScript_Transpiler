import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 3000;
const app = express();

app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, err => {
    if (err) {
        console.log(err);
    }
    else {
        open(`http://localhost:${port}`);
    }
})
