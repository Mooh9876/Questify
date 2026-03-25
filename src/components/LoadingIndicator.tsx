type LoadingIndicatorProps = {
  label: string;
};

export const LoadingIndicator = ({ label }: LoadingIndicatorProps) => (
  <div className="info-banner loading-banner" aria-live="polite">
    {label}
  </div>
);