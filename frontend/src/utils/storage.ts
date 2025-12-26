export const saveToken = (token: string) => {
    localStorage.setItem("accessToken", token);
};

export const getSavedToken = () => {
    return localStorage.getItem("accessToken");
};

export const clearToken = () => {
    localStorage.removeItem("accessToken");
};
