export type GenericResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};

export type SourceResponseForCreate = {
    user: string | any;
    sourceName: string;
    sourceId: string;
    apiKey: string;
    _id: string | any;
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: number;
};

export type LeadProceedResponse = {
    lead: {
        sourceId: string;
        email: string;
        phone: string;
        validationStatus: "valid" | "invalid";
        user: string;
        _id: string | any;
        createdAt: string | Date;
        updatedAt: string | Date;
        __v: number;
    };
};
