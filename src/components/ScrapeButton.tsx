interface ScrapeButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const ScrapeButton: React.FC<ScrapeButtonProps> = ({
  isLoading,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full py-3 px-4 bg-gradient-to-r from-[#11c9bb] to-[#7bc911] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Scraping...</span>
        </>
      ) : (
        <span>🏏 Scrape Player Data</span>
      )}
    </button>
  );
};
