//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    session(): Promise<SessionInfo> {
        let url_ = this.baseUrl + "/api/Auth/session";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSession(_response);
        });
    }

    protected processSession(response: Response): Promise<SessionInfo> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SessionInfo.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<SessionInfo>(null as any);
    }

    /**
     * Authenticates a user
     * @param body (optional) User id and password
     * @return Success
     */
    login(body: LoginModel | undefined): Promise<AuthResponse> {
        let url_ = this.baseUrl + "/api/Auth/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLogin(_response);
        });
    }

    protected processLogin(response: Response): Promise<AuthResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AuthResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AuthResponse>(null as any);
    }

    /**
     * @return Success
     */
    logout(): Promise<AuthResponse> {
        let url_ = this.baseUrl + "/api/Auth/logout";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLogout(_response);
        });
    }

    protected processLogout(response: Response): Promise<AuthResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AuthResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AuthResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    register(body: RegisterModel | undefined): Promise<AuthResponse> {
        let url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegister(_response);
        });
    }

    protected processRegister(response: Response): Promise<AuthResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AuthResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AuthResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    evaluate(body: TransformRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Fhirata/evaluate";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processEvaluate(_response);
        });
    }

    protected processEvaluate(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    mappingPOST(body: SaveMappingRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Fhirata/mapping";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processMappingPOST(_response);
        });
    }

    protected processMappingPOST(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    mappingDELETE(body: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Fhirata/mapping";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processMappingDELETE(_response);
        });
    }

    protected processMappingDELETE(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param request (optional) 
     * @return Success
     */
    mappingAll(request: StoreRequest | undefined): Promise<UserMappingOption[]> {
        let url_ = this.baseUrl + "/api/Fhirata/mapping?";
        if (request === null)
            throw new Error("The parameter 'request' cannot be null.");
        else if (request !== undefined)
            url_ += "request=" + encodeURIComponent("" + request) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processMappingAll(_response);
        });
    }

    protected processMappingAll(response: Response): Promise<UserMappingOption[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(UserMappingOption.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserMappingOption[]>(null as any);
    }
}

export class AuthResponse implements IAuthResponse {
    success?: boolean;
    message?: string | undefined;
    token?: string | undefined;
    expiration?: Date | undefined;

    constructor(data?: IAuthResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.token = _data["token"];
            this.expiration = _data["expiration"] ? new Date(_data["expiration"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): AuthResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AuthResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["token"] = this.token;
        data["expiration"] = this.expiration ? this.expiration.toISOString() : <any>undefined;
        return data;
    }
}

export interface IAuthResponse {
    success?: boolean;
    message?: string | undefined;
    token?: string | undefined;
    expiration?: Date | undefined;
}

/** User authentication */
export class LoginModel implements ILoginModel {
    /** User ID (email) */
    email!: string;
    /** User password */
    password!: string;

    constructor(data?: ILoginModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): LoginModel {
        data = typeof data === 'object' ? data : {};
        let result = new LoginModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }
}

/** User authentication */
export interface ILoginModel {
    /** User ID (email) */
    email: string;
    /** User password */
    password: string;
}

export class RegisterModel implements IRegisterModel {
    email!: string;
    password!: string;

    constructor(data?: IRegisterModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): RegisterModel {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }
}

export interface IRegisterModel {
    email: string;
    password: string;
}

export class SaveMappingRequest implements ISaveMappingRequest {
    id?: string | undefined;
    name?: string | undefined;
    json?: string | undefined;
    expression?: string | undefined;
    confirmOverwrite?: boolean;

    constructor(data?: ISaveMappingRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.json = _data["json"];
            this.expression = _data["expression"];
            this.confirmOverwrite = _data["confirmOverwrite"];
        }
    }

    static fromJS(data: any): SaveMappingRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SaveMappingRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["json"] = this.json;
        data["expression"] = this.expression;
        data["confirmOverwrite"] = this.confirmOverwrite;
        return data;
    }
}

export interface ISaveMappingRequest {
    id?: string | undefined;
    name?: string | undefined;
    json?: string | undefined;
    expression?: string | undefined;
    confirmOverwrite?: boolean;
}

export class SessionInfo implements ISessionInfo {
    email?: string | undefined;
    isAuthenticated?: boolean;

    constructor(data?: ISessionInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.isAuthenticated = _data["isAuthenticated"];
        }
    }

    static fromJS(data: any): SessionInfo {
        data = typeof data === 'object' ? data : {};
        let result = new SessionInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["isAuthenticated"] = this.isAuthenticated;
        return data;
    }
}

export interface ISessionInfo {
    email?: string | undefined;
    isAuthenticated?: boolean;
}

export class StoreRequest implements IStoreRequest {

    constructor(data?: IStoreRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
    }

    static fromJS(data: any): StoreRequest {
        data = typeof data === 'object' ? data : {};
        let result = new StoreRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export interface IStoreRequest {
}

export class TransformRequest implements ITransformRequest {
    /** Input JSON data to perform evaluation */
    json!: string;
    /** An expression to be evaluted */
    expression!: string;

    constructor(data?: ITransformRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.json = _data["json"];
            this.expression = _data["expression"];
        }
    }

    static fromJS(data: any): TransformRequest {
        data = typeof data === 'object' ? data : {};
        let result = new TransformRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["json"] = this.json;
        data["expression"] = this.expression;
        return data;
    }
}

export interface ITransformRequest {
    /** Input JSON data to perform evaluation */
    json: string;
    /** An expression to be evaluted */
    expression: string;
}

export class UserMappingOption implements IUserMappingOption {
    id?: string;
    name?: string | undefined;
    json?: string | undefined;
    expression?: string | undefined;
    createDate?: Date | undefined;

    constructor(data?: IUserMappingOption) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.json = _data["json"];
            this.expression = _data["expression"];
            this.createDate = _data["createDate"] ? new Date(_data["createDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): UserMappingOption {
        data = typeof data === 'object' ? data : {};
        let result = new UserMappingOption();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["json"] = this.json;
        data["expression"] = this.expression;
        data["createDate"] = this.createDate ? this.createDate.toISOString() : <any>undefined;
        return data;
    }
}

export interface IUserMappingOption {
    id?: string;
    name?: string | undefined;
    json?: string | undefined;
    expression?: string | undefined;
    createDate?: Date | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}