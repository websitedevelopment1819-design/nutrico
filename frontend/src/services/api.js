
const API_URL = "http://localhost:5000";

export async function checkBackend() {
    try {
        const response = await fetch(`${API_URL}/api/health`);

        if (!response.ok) {
            throw new Error("Backend connection failed");
        }

        return await response.json();
    } catch (error) {
        console.error("NUTRICO API Error:", error);
        throw error;
    }
}

export default API_URL;
