const vscode = require("vscode");

async function showQuickPick(map) {
  const panel = await vscode.window.showQuickPick(Object.keys(map));
  if (panel) {
    const document = await vscode.workspace.openTextDocument(panel);
    await vscode.window.showTextDocument(document);
  }
}

module.exports = {
    showQuickPick,
  };