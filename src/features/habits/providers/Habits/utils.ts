const toError = (candidate: unknown): Error | null => {
  if (!candidate) {
    return null;
  }

  if (candidate instanceof Error) {
    return candidate;
  }

  return new Error("Unexpected habits error");
};

export const mergeErrors = (...candidates: unknown[]): Error | null => {
  for (const candidate of candidates) {
    const error = toError(candidate);
    if (error) {
      return error;
    }
  }

  return null;
};
