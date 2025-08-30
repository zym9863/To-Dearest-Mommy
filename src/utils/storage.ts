/**
 * 本地存储工具：提供命名空间化的 get/set/remove 方法。
 * - 命名空间前缀：tdm.
 * - 序列化：使用 JSON.stringify；日期请在调用方转为 ISO 字符串。
 */
const NS = 'tdm.';

/**
 * 生成带命名空间的 key
 */
function ns(key: string): string {
  return `${NS}${key}`;
}

/**
 * 从 localStorage 获取对象并解析为泛型类型
 * @param key 业务 key（不含命名空间）
 */
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(ns(key));
    if (raw == null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * 将对象写入 localStorage
 * @param key 业务 key（不含命名空间）
 * @param value 任意可序列化对象
 */
export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(ns(key), JSON.stringify(value));
    return true;
  } catch {
    // 容量或权限错误
    return false;
  }
}

/**
 * 删除 localStorage 中的键
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(ns(key));
  } catch {
    // 忽略错误
  }
}
