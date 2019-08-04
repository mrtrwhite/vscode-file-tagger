import * as vscode from 'vscode';

export class Tag extends vscode.TreeItem {
    constructor(label, collapsible) {
        super(label, collapsible);
        this.items = [];
    }
}