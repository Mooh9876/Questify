type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="info-banner error-banner" role="alert">
      {message}
    </div>
  );
};