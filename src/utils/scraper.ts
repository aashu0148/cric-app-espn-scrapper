import { ScrapeResponse } from "../types/player";

export async function scrapeCurrentPage(): Promise<ScrapeResponse> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) {
        resolve({ success: false, error: "No active tab found" });
        return;
      }

      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "scrapePlayer" },
        (response: ScrapeResponse) => {
          if (chrome.runtime.lastError) {
            resolve({
              success: false,
              error: "Failed to communicate with page. Please refresh.",
            });
            return;
          }
          resolve(response);
        }
      );
    });
  });
}

export async function checkPageValidity(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) {
        resolve(false);
        return;
      }

      const url = tabs[0].url || "";
      // Match URLs like: https://www.espncricinfo.com/cricketers/player-name-123456
      const pattern = /espncricinfo\.com\/cricketers\/[\w-]+-\d+/;
      if (!pattern.test(url)) {
        resolve(false);
        return;
      }

      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "checkPage" },
        (response: { isValid: boolean }) => {
          if (chrome.runtime.lastError) {
            resolve(false);
            return;
          }
          resolve(response?.isValid || false);
        }
      );
    });
  });
}
