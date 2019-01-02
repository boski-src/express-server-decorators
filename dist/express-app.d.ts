/// <reference types="node" />
import * as http from 'http';
import * as express from 'express';
import { IConfig, IRequest } from './common/interfaces';
export declare abstract class ExpressApp {
    private config;
    private mainPath;
    private logError?;
    app: express.Application;
    server: http.Server;
    constructor(config: IConfig, mainPath?: string, logError?: Function);
    abstract configure(): void;
    defaultConfig(): void;
    run(port: number): http.Server;
    jsonResponse({ data, error, code, status }: any, req?: IRequest): any;
    private init;
    private setupMiddlewares;
    private setupControllers;
    private catchHandler;
}
