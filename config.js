const RPCListenPort = parseInt(process.env.RPC_LISTEN_PORT || 9545)
const WSListenPort = parseInt(process.env.WS_LISTEN_PORT || 9546)

const RPCTarget = process.env.RPC_TARGET || "http://localhost:8545"
const WSTarget = process.env.WS_TARGET || "ws://localhost:8546"

module.exports = {RPCListenPort, WSListenPort, RPCTarget, WSTarget}
