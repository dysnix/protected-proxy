const url = require('url')
const http = require('http')
const httpProxy = require('http-proxy')
const OtpValidator = require("./otp");
const config = require('./config')

const validator = new OtpValidator()
const rpcProxy = new httpProxy.createProxyServer({target: config.RPCTarget});
const wsProxy = new httpProxy.createProxyServer({target: config.WSTarget, wsProxy: true});

function getTokenByReq(req) {
    return url.parse(req.url, true).query.otp
}

function getProxyServer(proxy) {
    return http.createServer(function (req, res) {
        const token = getTokenByReq(req)
        req.url = '/'

        if (!token || !validator.isTokenValid(token)) {
            res.writeHead(403, {'Content-Type': 'text/plain'});
            res.write('Access denied\n');
            res.end();
        } else {
            proxy.web(req, res, err => {
                console.log(err)
                res.writeHead(502, {'Content-Type': 'text/plain'});
                res.write('Bad gateway\n');
                res.end();
            })
        }
    })
}

rpcProxyServer = getProxyServer(rpcProxy)
wsProxyServer = getProxyServer(wsProxy)

wsProxyServer.on('upgrade', function (req, socket, head) {
    const token = getTokenByReq(req)
    req.url = '/'

    wsProxy.on('error', err => {
        socket.end()
    });

    if (!token || !validator.isTokenValid(token)) {
        socket.end()
    } else {
        wsProxy.ws(req, socket, head);
    }
});

rpcProxyServer.listen(config.RPCListenPort);
wsProxyServer.listen(config.WSListenPort);
