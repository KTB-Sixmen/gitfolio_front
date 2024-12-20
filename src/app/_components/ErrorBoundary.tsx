"use client";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { handleApiError } from "../api/errorHandler";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert" className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold text-red-500 mb-4">
        에러가 발생했습니다
      </h2>
      <pre className="text-red-400 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        다시 시도
      </button>
    </div>
  );
};

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
}

export const QueryErrorBoundary: React.FC<QueryErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => handleApiError(error as any)}
    >
      {children}
    </ErrorBoundary>
  );
};
