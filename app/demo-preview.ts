"use client";

import { useSyncExternalStore } from "react";

const key = "capmit-preview-included";
const eventName = "capmit-preview-changed";
let fallback = false;

function snapshot() {
  try { return window.sessionStorage.getItem(key) === "true"; }
  catch { return fallback; }
}

function subscribe(listener: () => void) {
  window.addEventListener(eventName, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(eventName, listener);
    window.removeEventListener("storage", listener);
  };
}

export function setDemoPreview(included: boolean) {
  fallback = included;
  try { window.sessionStorage.setItem(key, String(included)); } catch { /* Keep the preview usable when storage is unavailable. */ }
  window.dispatchEvent(new Event(eventName));
}

export function useDemoPreview() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
