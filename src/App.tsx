import { useState, useEffect } from "react";
import { StatusMessage } from "./components/StatusMessage";
import { ScrapeButton } from "./components/ScrapeButton";
import { checkPageValidity, scrapeCurrentPage } from "./utils/scraper";
import { sendPlayerToBackend } from "./utils/api";
import logoSvg from "./assets/logo.svg";

type StatusType = "success" | "error" | "warning" | "info";

function App() {
  const [isValidPage, setIsValidPage] = useState(false);
  const [status, setStatus] = useState<{ type: StatusType; message: string }>({
    type: "info",
    message: "Checking page...",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    type: StatusType;
    message: string;
  } | null>(null);

  useEffect(() => {
    checkPage();
  }, []);

  const checkPage = async () => {
    const isValid = await checkPageValidity();
    setIsValidPage(isValid);

    if (isValid) {
      setStatus({ type: "success", message: "Ready to scrape player data" });
    } else {
      setStatus({ type: "warning", message: "Not on an ESPN player page" });
    }
  };

  const handleScrape = async () => {
    setIsLoading(true);
    setResultMessage({ type: "info", message: "⏳ Scraping player data..." });

    try {
      // Step 1: Scrape data from page
      const scrapeResponse = await scrapeCurrentPage();

      if (!scrapeResponse.success || !scrapeResponse.data) {
        throw new Error(scrapeResponse.error || "Failed to scrape data");
      }

      setResultMessage({ type: "info", message: "⏳ Sending to backend..." });

      // Step 2: Send to backend
      const apiResponse = await sendPlayerToBackend(scrapeResponse.data);

      if (apiResponse.success) {
        setResultMessage({
          type: "success",
          message: `Success! Player saved: ${scrapeResponse.data.name}`,
        });
      } else {
        throw new Error(apiResponse.message || "Failed to save player");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setResultMessage({ type: "error", message: `❌ Error: ${errorMessage}` });
    } finally {
      setIsLoading(false);
      setTimeout(() => setResultMessage(null), 5000);
    }
  };

  return (
    <div className="w-[380px] bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#11c9bb] to-[#7bc911] text-white p-4 flex items-center gap-3">
        <img src={logoSvg} alt="Logo" className="w-10 h-10" />
        <h1 className="text-lg font-semibold">ESPN Player Scraper</h1>
      </div>

      {/* Status Section */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <StatusMessage type={status.type} message={status.message} />
      </div>

      {/* Action Section */}
      <div className="p-5">
        <ScrapeButton
          isLoading={isLoading}
          disabled={!isValidPage}
          onClick={handleScrape}
        />
      </div>

      {/* Result Section */}
      {resultMessage && (
        <div className="px-5 pb-4">
          <StatusMessage
            type={resultMessage.type}
            message={resultMessage.message}
          />
        </div>
      )}

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          Navigate to an ESPN Cricinfo player page to scrape data.
        </p>
      </div>
    </div>
  );
}

export default App;
