// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { FileSystemProvider } from './FileSystemProvider';
import { TagItem } from './TagItem';
import { Tag } from './Tag';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function activate(context) {
	console.log('The File Tagger extension is now active.');

	const treeDataProvider = new FileSystemProvider(context);
	vscode.window.createTreeView('tagExplorer', { treeDataProvider });

	let addProjectCmd = vscode.commands.registerCommand('tagExplorer.addTag', () => {
		vscode.window.showInputBox({
			placeHolder: 'Enter tag name'
		})
		.then(value => {
			let tags = context.workspaceState.get('tags');
			if (typeof tags === 'undefined') {
				tags = {};
			}
			tags[value] = new Tag(value, 2);
			context.workspaceState.update('tags', tags);
			treeDataProvider.refresh();
		})
		.catch(console.error)
	});

	context.subscriptions.push(addProjectCmd);
	
	let tagFileCmd = vscode.commands.registerCommand('extension.tagFile', (e) => {
		vscode.window.showQuickPick(Object.keys(context.workspaceState.get('tags')), {
			placeHolder: 'Select Tag'
		})
		.then(selection => {
			let tags = context.workspaceState.get('tags');
			let tag = tags[selection];
			tag.items.push(new TagItem(e.path, e.scheme));
			tags[selection] = tag;
			context.workspaceState.update('tags', tags);
			treeDataProvider.refresh();
		})
		.catch(console.error)
	});

	context.subscriptions.push(tagFileCmd);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

export {
	activate,
	deactivate
}
