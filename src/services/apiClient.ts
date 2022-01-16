import electron from "electron";
// const electron = window.require("electron") as typeof Electron;

type Urls = "/save_file";

type ApiResponses = {
    response: {
        status: number;
        data: any;
    };
};

type ApiInstanceProps = {
    url: Urls;
    data?: any;
    params?: any;
};

type ApiInstance = (data: ApiInstanceProps) => Promise<ApiResponses>;

const electronConnectionByName = (name: string) => {
    return new Promise<ApiResponses>((resolve, reject) => {
        const electronConnectionCallback = (_: any, value: any) => {
            if (value.status > 399) {
                reject(value);
            } else {
                resolve(value.response);
            }
            electron.ipcRenderer.removeListener(
                `main${name}`,
                electronConnectionCallback
            );
        };
        electron.ipcRenderer.on(`main${name}`, electronConnectionCallback);
    });
};

const getApiClient = (): ApiInstance => {
    return ({ url, data, params }) => {
        electron.ipcRenderer.send(`renderer${url}`, { data, params });
        return electronConnectionByName(url);
    };
};

export type { ApiInstance };
export { getApiClient };
