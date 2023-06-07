export enum Endpoints {
    SOURCES = "sources",
    NEWS = "everything",
}

export type NewsResp =  INewsApiResponse|INewsApiSourcesResponse;

/**
 * If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.
 */
export type ApiNewsResponseStatus = 'ok' | 'error';

/**
 * Source object
 */
export interface INewsApiSourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

/**
 * Response object for 'getSources'.
 */
export interface INewsApiSourcesResponse {
    status: ApiNewsResponseStatus;
    code?: string;
    error?: string;
    sources: Array<INewsApiSourceItem>;
}

/**
 * The identifier id and a display name for News Source
 */
export interface INewsApiSource {
    id: string | null;
    name: string;
}

/**
 * News Object
 */
export interface INewsApiArticle {
    source: INewsApiSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

/**
 * Response object for getNews
 */
export interface INewsApiResponse {
    status: ApiNewsResponseStatus;
    code?: string;
    error?: string;
    totalResults: number;
    articles: Array<INewsApiArticle>;
}
