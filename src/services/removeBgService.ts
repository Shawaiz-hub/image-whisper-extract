
export interface RemoveBgResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export const removeBgFromImage = async (imageFile: File): Promise<RemoveBgResult> => {
  const API_KEY = "pHUTawjBnTAp7gohbxYV2RPC";
  const API_ENDPOINT = "https://api.remove.bg/v1.0/removebg";

  try {
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("size", "auto");

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.title || `HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    console.error("Background removal error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to remove background",
    };
  }
};
