const vscode = require("vscode");
const { grepFiles } = require("./src/fuzzy_finder/views/find_files");
const { GrepSearch } = require("./src/grep-files/views/grep-search");

function activate(context) {
  const disposable1 = vscode.commands.registerCommand(
    "comfy-live-grep.grep-files",
    async function () {
      await grepFiles();
    }
  );
  context.subscriptions.push(disposable1);
  // context.subscriptions.push(disposable1, disposable2);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};