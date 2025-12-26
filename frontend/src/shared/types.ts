export type GenericResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};

export type SignupRequest = {
    name: string;
    email: string;
    password: string;
};

export type SignupLoginResponse = {
    user: {
        name: string;
        email: string;
        password: string;
        isVerified: boolean;
        verificationToken: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
};

export type VerifyEmailResponse = {
    accessToken: string;
    user: {
        name: string;
        email: string;
        password: string;
        isVerified: boolean;
        verificationToken: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
};

export type Source = {
    _id: string;
    user: string;
    sourceName: string;
    sourceId: string;
    apiKey: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type UserSourceResponse = {
    sources: Source[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
};

export type Lead = {
    _id: string;
    sourceId: string;
    email: string;
    phone: string;
    validationStatus: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    source: {
        _id: string;
        user: string;
        sourceName: string;
        sourceId: string;
        apiKey: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
};

export type LeadsResponse = {
    leads: Lead[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
};

export type LeadProceedResponse = {
    lead: {
        sourceId: string;
        email: string;
        phone: string;
        validationStatus: "valid" | "invalid";
        user: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
};
