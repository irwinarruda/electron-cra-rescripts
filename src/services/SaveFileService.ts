import { getApiClient, ApiInstance } from "./apiClient";

type SaveFileRequestBody = {
    file: string;
};

class SaveFileService {
    private api: ApiInstance;
    constructor() {
        this.api = getApiClient();
    }
    public async saveFile(body: SaveFileRequestBody) {
        const response = await this.api({
            url: "/save_file",
            data: body,
        });
        console.log(response);
    }
}

export { SaveFileService };
