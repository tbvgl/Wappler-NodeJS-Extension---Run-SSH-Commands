const fs = require('fs')
const { connect } = require('http2')
const { toSystemPath } = require('../../../lib/core/path')
const { exitCode, exit, connected } = require('process')
const SSH2Promise = require('ssh2-promise')
const { NodeSSH } = require('node-ssh')

//Error
let throwerror = (error) => {
    throw new Error(error)
}

//Run SSH Command
exports.sshRunCommand = async function (options) {
    const path = require('path')
    const { NodeSSH } = require('node-ssh')
    const ssh = new NodeSSH()

    options = this.parse(options)
    let key = options.sshKey
    let commands = options.commands
    let hostDetail = options.hostDetail
    let username = options.username
    let remotepath = options.remotepath
    let passphrase = options.passphrase

    try {
        let connect = await ssh.connect({
            host: `${hostDetail}`,
            username: `${username}`,
            privateKeyPath: toSystemPath(`${key}`),
            passphrase: `${passphrase}`,
        })
    } catch (error) {
        throwerror(error)
    }
    let result = await ssh.execCommand(`${commands}`, { cwd: `${remotepath}` })
    ssh.exit
    return {
        stdout: result.stdout,
        stderror: result.stderr,
        code: result.code,
        error: result.error,
    }
}

//SFTP Put File
exports.sftpPutFile = async function (options) {
    const path = require('path')
    const { NodeSSH } = require('node-ssh')
    const ssh = new NodeSSH()

    options = this.parse(options)
    let key = options.sshKey
    let hostDetail = options.hostDetail
    let username = options.username
    let localpath = options.localpath
    let remotepath = options.remotepath
    let passphrase = options.passphrase

    try {
        let connect = await ssh.connect({
            host: `${hostDetail}`,
            username: `${username}`,
            privateKeyPath: toSystemPath(`${key}`),
            passphrase: `${passphrase}`,
        })
    } catch (error) {
        throwerror(error)
    }

    try {
        await ssh.putFile(toSystemPath(`${localpath}`), `${remotepath}`)
    } catch (error) {
        console.log(error)
        ssh.exit
        throwerror(error)
    }
    ssh.exit
}

//SFTP Pull File
exports.sftpPullFile = async function (options) {
    const path = require('path')
    const { NodeSSH } = require('node-ssh')
    const ssh = new NodeSSH()

    options = this.parse(options)
    let key = options.sshKey
    let hostDetail = options.hostDetail
    let username = options.username
    let localpath = options.localpath
    let remotepath = options.remotepath
    let passphrase = options.passphrase

    try {
        let connect = await ssh.connect({
            host: `${hostDetail}`,
            username: `${username}`,
            privateKeyPath: toSystemPath(`${key}`),
            passphrase: `${passphrase}`,
        })
    } catch (error) {
        throwerror(error)
    }

    try {
        await ssh.getFile(toSystemPath(`${localpath}`), `${remotepath}`)
    } catch (error) {
        console.log(error)
        ssh.exit
        throwerror(error)
    }
    ssh.exit
}
