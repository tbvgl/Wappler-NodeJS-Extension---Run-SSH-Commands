const fs = require("fs");
const SSH2Promise = require("ssh2-promise");

exports.runSSHCommand = async function (options) {
  options = this.parse(options);
  let key = options.sshKey;
  let commands = options.commands;
  let hostDetail = options.hostDetail;
  let username = options.username;

  var sshconfig = {
    host: `${hostDetail}`,
    username: `${username}`,
    identity: `${key}`,
  };

  var ssh = new SSH2Promise(sshconfig);

  async function connect() {
    try {
      await ssh.connect();
      console.log("Connection established");
    } catch (e) {
      console.log(e.message);
      let error = e.message;
      return error;
    }
  }

  async function runcommand() {
    try {
      var data = await ssh.exec(`${commands}`);
      ssh.close();
      console.log(`connection closed`);
      return data;
    } catch (e) {
      console.log(e.message);
      return data;
    }
  }
  let errormessage = await connect();
  let data = await runcommand();
  console.log(JSON.stringify(data));
  return { exportstdout: data, error: errormessage };
};
