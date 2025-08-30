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
export type DownloadScale = 1 | 1.5 | 2;

export interface DownloadOptions {
  /** 清晰度倍率，默认 2 */
  scale?: DownloadScale;
  /** 文件名（不含扩展名） */
  fileName?: string;
}

export interface DownloadResult {
  ok: boolean;
  /** 实际使用的 scale（考虑失败后降级） */
  usedScale?: DownloadScale;
  error?: unknown;
}

/**
 * 将 canvas 下载为 PNG 文件
 */
function downloadCanvas(canvas: HTMLCanvasElement, fileName: string) {
  const link = document.createElement("a");
  link.download = `${fileName}.png`;
  // 为兼容性，使用 toDataURL；如需更小体积可改用 toBlob + 对象 URL
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * 生成并下载图片，支持清晰度与失败自动降级
 * @param element 待截图的元素
 * @param options 可选项：scale、fileName
 */
export const generateAndDownloadImage = async (
  element: HTMLElement,
  options: DownloadOptions = {}
): Promise<DownloadResult> => {
  const { default: html2canvas } = await import("html2canvas");

  const tryScales: DownloadScale[] = ((): DownloadScale[] => {
    const s = (options.scale ?? 2) as DownloadScale;
    // 优先使用用户选择，再按 1.5 -> 1 回退
    const order: DownloadScale[] = [s];
    if (!order.includes(1.5)) order.push(1.5);
    if (!order.includes(1)) order.push(1);
    return order as DownloadScale[];
  })();

  const fileName = options.fileName ?? "贺卡";

  for (const s of tryScales) {
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: s,
        backgroundColor: null,
      });
      downloadCanvas(canvas, fileName);
      return { ok: true, usedScale: s };
    } catch (error) {
      // 降级继续尝试
      if (s === 1) {
        return { ok: false, error };
      }
    }
  }

  return { ok: false };
};
