// Content script for ESPN Player Data Scraper
// This script runs on ESPN Cricinfo player pages

import { PlayerData, ScrapeResponse } from "./types/player";

function snakeToCamelCase(str: string): string {
  return str.replace(/_(.)/g, (_, char) => char.toUpperCase());
}

function scrapeStatsFromTable(
  tableElement: HTMLTableElement
): Record<string, string>[] {
  const colsNames = Array.from(tableElement.querySelectorAll("thead th")).map(
    (e) => e.textContent || ""
  );
  const rows = tableElement.querySelectorAll("tbody tr");
  const data: Record<string, string>[] = [];

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowData: Record<string, string> = {};

    cells.forEach((cell, index) => {
      rowData[colsNames[index]] = cell.textContent?.trim() || "";
    });

    const final: Record<string, string> = {};
    for (const k in rowData) {
      final[k.toLowerCase()] = rowData[k];
    }

    data.push(final);
  });

  return data;
}

function isValidPlayerPage(): boolean {
  const url = window.location.href;
  // Match URLs like: https://www.espncricinfo.com/cricketers/player-name-123456
  const pattern = /espncricinfo\.com\/cricketers\/[\w-]+-\d+/;
  return pattern.test(url);
}

function scrapePlayerData(): PlayerData {
  console.log("🟡 Scraping player data from ESPN...");

  // Check if valid player page
  if (!isValidPlayerPage()) {
    throw new Error("Not a valid ESPN player page");
  }

  // Extract __NEXT_DATA__ JSON
  const scriptElement = document.getElementById("__NEXT_DATA__");
  if (!scriptElement || !scriptElement.textContent) {
    throw new Error("__NEXT_DATA__ script not found");
  }

  const nextData = JSON.parse(scriptElement.textContent);
  const playerData = nextData.props?.appPageProps?.data?.player;

  if (!playerData) {
    throw new Error("Player data not found in __NEXT_DATA__");
  }

  const { name, id, slug, objectId } = playerData;

  // Extract image
  const imageElement = document.querySelector(
    ".ds-bg-cover img"
  ) as HTMLImageElement | null;
  const image = imageElement ? imageElement.getAttribute("src") : null;

  // Extract player information
  const infoGrid = document.querySelector(".ds-grid.ds-grid-cols-2");
  const information: Record<string, string> = {};

  if (infoGrid) {
    const infoBoxes = Array.from(infoGrid.querySelectorAll(":scope > div"));

    infoBoxes.forEach((box) => {
      const labelElement = box.querySelector(":scope > p");
      const valueElement = box.querySelector("span > p");

      if (labelElement && valueElement) {
        let label = labelElement.textContent?.trim() || "";
        const value = valueElement.textContent?.trim() || "";

        if (label) {
          label = snakeToCamelCase(label.toLowerCase().replace(/ /g, "_"));
          information[label] = value;
        }
      }
    });
  }

  // Extract stats from tables
  const tablesContainer = document
    .querySelector("table")
    ?.closest(".ds-w-full.ds-bg-fill-content-prime");

  const allStats: { heading: string; data: Record<string, string>[] }[] = [];

  if (tablesContainer) {
    const tables = Array.from(
      tablesContainer.querySelectorAll("table")
    ) as HTMLTableElement[];

    tables.forEach((table) => {
      try {
        // Get the heading from the parent structure
        const heading =
          table.parentNode?.parentNode?.childNodes[0]?.textContent || "Unknown";
        const tableData = scrapeStatsFromTable(table);

        if (tableData.length > 0) {
          allStats.push({
            heading,
            data: tableData,
          });
        }
      } catch (err) {
        console.error("Error scraping table:", err);
      }
    });
  }

  // Get current URL
  const espnUrl = window.location.href;

  // Compile all data
  const scrapedData: PlayerData = {
    name,
    id,
    slug,
    objectId,
    country: playerData.country?.name || "",
    image,
    espnUrl,
    stats: allStats,
    information,
    full_name: name,
    playingRole: information.playingRole || "",
    battingStyle: information.battingStyle || "",
    bowlingStyle: information.bowlingStyle || "",
  };

  console.log("✅ Successfully scraped player data:", scrapedData);
  return scrapedData;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkPage") {
    const isValid = isValidPlayerPage();
    sendResponse({ isValid });
    return true;
  }

  if (request.action === "scrapePlayer") {
    try {
      const data = scrapePlayerData();
      sendResponse({ success: true, data } as ScrapeResponse);
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      } as ScrapeResponse);
    }
    return true;
  }

  return false;
});

console.log("✅ ESPN Player Scraper content script loaded");
