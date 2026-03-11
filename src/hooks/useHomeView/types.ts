export type UseHomeViewResult = {
  selectedDate: string;
  doneCount: number;
  totalHabits: number;
  isCodePromptOpen: boolean;
  shouldRenderCodePrompt: boolean;
  isFabBuzzing: boolean;
  handleFirstInteraction: () => void;
  openCodePrompt: () => void;
  closeCodePrompt: () => void;
};
