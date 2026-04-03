const API_BASE = import.meta.env.VITE_API_BASE;

export async function testConnection() {
  const response = await fetch(`${API_BASE}/test/`);

  if (!response.ok) {
    throw new Error("Connection failed");
  }

  return response.json();
}
