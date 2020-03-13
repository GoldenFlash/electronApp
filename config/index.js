const fs = require('fs');
const path = require('path');
const json5 = require('json5');
const { shell } = require('electron');
const template  = require('./template');

const filePath = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  '.rndebuggerrc'
);

const readConfig = (configFile = filePath) => {
  if (!fs.existsSync(configFile)) {
    // Create a new one
    fs.writeFileSync(configFile, template);
    return { config: json5.parse(template) };
  }
  try {
    // eslint-disable-next-line
    return { config: json5.parse(fs.readFileSync(configFile, 'utf-8')) };
  } catch (error) {
    // Alert parse config not successful
    return { config: json5.parse(template), isConfigBroken: true, error };
  }
};

const openConfigFile = (configFile = filePath) => {
  readConfig();
  shell.openItem(configFile);
};

module.exports={
  filePath,
  readConfig,
  openConfigFile
}
