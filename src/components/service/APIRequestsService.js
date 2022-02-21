export const handleAPIResponseError = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}