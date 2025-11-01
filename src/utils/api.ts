import { config } from "../config";
import { PlayerData } from "../types/player";

export async function sendPlayerToBackend(
  playerData: PlayerData
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${config.backendUrl}${config.apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
