const fs = require("fs");

exports.RunSSHCommand = function (options) {
  options = this.parse(options);
  let key = options.sshKey;
  let commands = options.commands;
  let hostDetail = options.hostDetail;
  let username = options.username;
  let SSH2Shell = require("ssh2shell");

  const host = {
    server: {
      host: `${hostDetail}`,
      userName: `${username}`,
      privateKey: require("fs").readFileSync(`${key}`),
    },
    commands: ["echo $(pwd)", `${commands}`],
  };

  (SSH = new SSH2Shell(host)),
    (callback = function (sessionText) {
      console.log(sessionText);
    });

  //Start the process
  SSH.connect(callback);
};
