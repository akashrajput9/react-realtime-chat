import { BASE_API } from "../config";


export async function apifetch(route, token = null, data = {}, method = "GET", headers = {}) {
    // console.log('api data payload ', data);
    try {
        method = method.toUpperCase();
        let url = BASE_API + route;

        // Add query parameters for GET requests
        if (method === "GET" && Object.keys(data).length > 0) {
            const queryParams = new URLSearchParams(data).toString();
            url += `?${queryParams}`;
        }

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
        };

        // Attach body for non-GET methods
        if (method !== "GET") {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        // Check if the response is not OK
        if (!response.ok) {
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            let errorResponse = {};
            try {
                errorResponse = await response.json();
                errorMessage = errorResponse.message || errorMessage;
            } catch (e) {
                console.error('Error parsing error response JSON:', e);
            }
            return {
                status: response.status,
                message: errorMessage,
                response: errorResponse,
                success: errorResponse?.success,
                ...(errorMessage === 'API Error' ? {} : { errorDetails: errorMessage }),
            };
        }

        // If the response is OK, parse and return the response JSON
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        // Handle network or unexpected errors
        return {
            status: 0,
            message: `Internal Error: ${error.message}`,
        };
    }
}
