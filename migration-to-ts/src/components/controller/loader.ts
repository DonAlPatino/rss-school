import {NewsResp, StatusCode} from "../../types";
class Loader {
    constructor(private readonly baseLink: string, private readonly options:Record<string, string>) {}

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
        callback = (data:NewsResp):void => {
            if (!data) console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options:Record<string, string>, endpoint:string):string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key:string):void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method:string, endpoint:string, callback:(data: NewsResp) => void, options = {}):void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res:Response) => res.json())
            .then((data:NewsResp) => callback(data))
            .catch((err:Error) => console.error(err));
    }
}

export default Loader;
