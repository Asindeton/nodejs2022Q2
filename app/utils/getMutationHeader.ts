export const getHeader = (token: string) => {
    return {
        headers: {
            Authorization: token,
        },
    };
};
