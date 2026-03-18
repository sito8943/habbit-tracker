export const MODAL_TRANSITION_MS = 220;

export const getInvalidCodeMessage = (codeLength: number): string =>
  `Use a valid ${codeLength}-character code (letters and numbers).`;
