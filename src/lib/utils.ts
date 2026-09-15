import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappLink(phoneNo: string, message: string) {
  // Remove any non-numeric characters
  const cleanNumber = phoneNo.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);

  // Add country code if not present
  const numberWithCode = cleanNumber.startsWith("62")
    ? cleanNumber
    : `62${cleanNumber.startsWith("0") ? cleanNumber.slice(1) : cleanNumber}`;

  return `https://wa.me/${numberWithCode}?text=${encodedMsg}`;
}
