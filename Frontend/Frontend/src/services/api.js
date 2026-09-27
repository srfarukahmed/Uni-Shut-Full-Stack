const BASE_URL = "http://localhost:8080/api";


export async function api(
    endpoint,
    options = {}
) {

    const token =
        localStorage.getItem("token");


    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };


    if (token) {

        headers.Authorization =
            `Bearer ${token}`;

    }


    return fetch(
        BASE_URL + endpoint,
        {
            ...options,
            headers
        }
    );
}