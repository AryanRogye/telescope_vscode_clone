const vscode = require("vscode");

async function showQuickPick(fileArray) {
  // show quick pick of the file array
  const panel = await vscode.window.showQuickPick(fileArray);
  if (panel) {
    // open the file in the editor
    const document = await vscode.workspace.openTextDocument(panel);
    await vscode.window.showTextDocument(document);
  }
}

module.exports = {
    showQuickPick,
  };