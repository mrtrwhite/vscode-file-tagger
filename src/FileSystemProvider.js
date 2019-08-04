import * as vscode from 'vscode';

export class FileSystemProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    getChildren (element) {
        if(element) {
            if(element.items) {
                return element.items;
            } else {
                return [];
            }
        } else {
            let tags = this.context.workspaceState.get('tags');
            if(tags) {
                return Object.values(tags);
            } else {
                return [];
            }
        }
        
    }

    getTreeItem (element) {
        if(element) {
            return {
                label: element.label,
                resourceUri: element.resourceUri,
                collapsibleState: element.collapsibleState,
                command: {
                    command: 'vscode.open',
                    arguments: [element.resourceUri]
                }
            }
        }
        return element;
    }

    refresh () {
        this._onDidChangeTreeData.fire();
    }
}