import express from 'express';
import config from '../webpack.config.dev';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import wdm from 'webpack-dev-middleware';
import whm from 'webpack-hot-middleware';

const app = express();
const port = 3000;
const compiler = webpack(config);

app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));

app.use(wdm(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(whm(compiler));

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

