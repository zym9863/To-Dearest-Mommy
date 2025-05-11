/**
 * Convert a File object to a data URL
 * @param file The file to convert
 * @returns A Promise that resolves with the data URL
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Resize an image to the specified dimensions
 * @param dataUrl The data URL of the image
 * @param maxWidth The maximum width of the resized image
 * @param maxHeight The maximum height of the resized image
 * @returns A Promise that resolves with the resized image as a data URL
 */
export const resizeImage = (
  dataUrl: string,
  maxWidth: number,
  maxHeight: number
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
  });
};

/**
 * Generate a downloadable image from HTML content
 * @param element The HTML element to convert to an image
 * @param fileName The name of the downloaded file
 */
export const generateAndDownloadImage = async (
  element: HTMLElement,
  fileName: string
): Promise<void> => {
  try {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    });
    
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
};
