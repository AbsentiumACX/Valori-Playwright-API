import { APIRequestContext, APIResponse } from "@playwright/test";

export class TvMazeClient {
    private readonly _context: APIRequestContext;

    constructor(context: APIRequestContext) {
        this._context = context;
    }

    async getShowByTitle(showTitle: string): Promise<APIResponse> {
        return await this._context.get(`/search/shows?q=${showTitle}`);
    }

    async getShowByShowId(showId: number): Promise<APIResponse> {
        return await this._context.get(`/shows/${showId}`);
    }
}