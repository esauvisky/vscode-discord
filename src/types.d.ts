import { WorkspaceConfiguration } from 'vscode';

interface IExtensionConfig {
	id: string;
	enabled: boolean;
	detailsEditing: string;
	detailsIdle: string;
	detailsDebugging: string;
	detailsViewing: string;
	lowerDetailsEditing: string;
	lowerDetailsIdle: string;
	lowerDetailsDebugging: string;
	lowerDetailsViewing: string;
	lowerDetailsNotFound: string;
	largeImage: string;
	largeImageIdle: string;
	smallImage: string;
	funnyMessages: string;
	workspaceElapsedTime: boolean;
	showProblems: boolean;
	problemsText: string;
	ignoreWorkspaces: string[];
	checkIdle: boolean;
	idleTimeout: number;
	disconnectTimeout: number;
	idleText: string;
	appName: string;
}

export type VSCordConfig = IExtensionConfig & WorkspaceConfiguration;

type LogLevel = 'INFO' | 'WARN' | 'ERROR';
