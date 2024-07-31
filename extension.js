const vscode = require("vscode");
const { grepFiles } = require("./src/fuzzy_finder/views/find_files");

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "comfy-live-grep.grep-files",
    async function () {
      await grepFiles();
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
  };