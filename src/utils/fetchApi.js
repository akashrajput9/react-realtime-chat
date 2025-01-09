import { BASE_API } from "../config";
import { store } from "../redux/store";

export async function apifetch(route,token=null, data = {}, method = "GET", headers = {}) {
    // const token =  store.getState().auth.token;
    // const token =  "2|kCimLtkK4tVKULtxVXhUUR4REFLK3oP50L65YtAN1c0c44f2";
    
    try {
        method = method.toUpperCase();
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
        };

        if (method !== "GET") {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(BASE_API + route, options);

        // Check if the response is not OK
        if (!response.ok) {
            // Attempt to get the error message from the response body
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            let errorResponse = {};
            try {
                errorResponse = await response.json();
                errorMessage = errorResponse.message || errorMessage; // Use the server's error message if available
            } catch (e) {
                // If the response body can't be parsed as JSON, use the generic error
                console.error('Error parsing error response JSON:', e);
            }

            return {
                status: response.status,
                message: errorMessage,
                response: errorResponse,
                success: errorResponse?.success,
                ...(errorMessage === 'API Error' ? {} : { errorDetails: errorMessage }), // Add the details from the server if present
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
