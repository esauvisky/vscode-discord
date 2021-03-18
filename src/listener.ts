import {
	Disposable,
	languages,
	window,
	workspace,
	debug,
	TextEditor,
	TextDocumentChangeEvent,
	WindowState,
	ConfigurationChangeEvent
} from 'vscode';

import type { Activity } from './activity';
import { getConfig } from './config';

export class Listener implements Disposable {
	private disposables: Disposable[] = [];

	public constructor(private activity: Activity) {}

	public listen() {
		this.dispose();

		const fileSwitch = window.onDidChangeActiveTextEditor;
		const fileEdit = workspace.onDidChangeTextDocument;
		const debugStart = debug.onDidStartDebugSession;
		const debugEnd = debug.onDidTerminateDebugSession;
		const diagnostictsChange = languages.onDidChangeDiagnostics;
		const changeWindowState = window.onDidChangeWindowState;
		const configChange = workspace.onDidChangeConfiguration;

		const { enabled, showProblems } = getConfig();

		if (enabled) {
			const onFileSwitch = fileSwitch((e: TextEditor | undefined) => this.activity.onFileSwitch(e!));
			const onFileEdit = fileEdit((e: TextDocumentChangeEvent) => this.activity.onFileEdit(e));
			const onDebugStart = debugStart(() => this.activity.toggleDebug());
			const onDebugEnd = debugEnd(() => this.activity.toggleDebug());
			const onConfigChange = configChange((e: ConfigurationChangeEvent) => this.activity.onConfigChange(e));

			this.disposables.push(onFileSwitch, onFileEdit, onDebugStart, onDebugEnd, onConfigChange);

			if (showProblems) {
				this.disposables.push(diagnostictsChange(() => this.activity.onDiagnosticsChange()));
			}

			this.disposables.push(changeWindowState((e: WindowState) => this.activity.onChangeWindowState(e)));
		}
	}

	public dispose() {
		this.disposables.forEach((disposable: Disposable) => disposable.dispose());
	}
}
