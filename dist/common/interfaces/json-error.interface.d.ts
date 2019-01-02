export interface IJSONError {
    _docs?: string;
    _links?: any[];
    error: {
        status?: number;
        code?: number | string;
        data?: string;
    };
}
