export declare class HttpError extends Error {
    status: number;
    isCustom: boolean;
    constructor(message: string, status: number);
}
