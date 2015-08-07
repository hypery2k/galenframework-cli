'use strict';
if (process.platform === 'darwin') {
  console.info('\n\nTo \x1b[4menable CLI tab autocompletion\x1b[0m run: \n' +
    ' \x1b[7mgalen completion >> ~/.profile\x1b[0m ' +
    '\n\n');
}
if (process.platform === 'linux') {
  console.info('\n\nTo \x1b[4menable CLI tab autocompletion\x1b[0m run: \n' +
    ' \x1b[7mgalen completion >> ~/.~/.bashrc\x1b[0m \n' +
    'or\n' +
    ' \x1b[7mgalen completion >> ~/.~/.zshrc\x1b[0m ' +
    '\n\n');
}
