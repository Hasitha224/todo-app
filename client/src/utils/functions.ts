export const getTotalPages = (totalRecords: number, pageSize: number) =>
  Math.max(1, Math.ceil(totalRecords / pageSize));

export const formatDateTime = (value: string) => {
  const date = new Date(value);

  const formattedDate = date.toLocaleDateString(); // date part
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${formattedDate} ${hours}:${minutes}`;
};

export const copyToClipboard = (text: string): void => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      if (typeof document === "undefined") return;
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    });
    return;
  }

  if (typeof document === "undefined") {
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

export function truncateStrings(
  text: string,
  startLength: number = 5,
  endLength: number = 5
): string {
  if (!text) return "";
  if (text.length <= startLength + endLength) return text;
  return text.slice(0, startLength) + "..." + text.slice(-endLength);
}