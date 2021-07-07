export interface IUsageData {
    labels: Array<string>;
    data: Array<number>;
}

export interface IStatusInfo {
    status: string;
}

export interface IUser {
    id: number;
    email: string;
    access_level: string;
    password: string;
}