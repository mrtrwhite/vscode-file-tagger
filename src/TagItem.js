import * as vscode from 'vscode';

export class TagItem extends vscode.TreeItem {
    constructor(path, scheme) {        
        super(vscode.Uri.file(path));

        let parts = path.split('/');
        let label = parts[parts.length - 1];

        this.label = label;
        this.scheme = scheme;
    }
}