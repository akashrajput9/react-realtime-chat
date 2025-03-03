import { BASE_API } from "../config";

export async function apifetch(route, token = null, data = {}, method = "GET", headers = {}, responseType = "json") {
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
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
        };

        // Detect FormData and attach body correctly
        if (method !== "GET") {
            if (data instanceof FormData) {
                options.body = data;
            } else {
                options.headers["Content-Type"] = "application/json";
                options.body = JSON.stringify(data);
            }
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
                console.error('🚨 Error parsing error response JSON:', e);
            }
            return {
                status: response.status,
                message: errorMessage,
                response: errorResponse,
                success: errorResponse?.success,
                ...(errorMessage === 'API Error' ? {} : { errorDetails: errorMessage }),
            };
        }

        // ✅ Handle binary responses like files
        if (responseType.toLowerCase() === "blob") {
            return await response.blob();
        }

        // ✅ Handle text responses
        if (responseType.toLowerCase() === "text") {
            return await response.text();
        }

        // ✅ Default: Parse JSON responses
        return await response.json();
    } catch (error) {
        return {
            status: 0,
            message: `🚨 Internal Error: ${error.message}`,
        };
    }
}
