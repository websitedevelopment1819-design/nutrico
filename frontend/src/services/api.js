
const API_URL = "https://nutrico-backend.vercel.app";

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
