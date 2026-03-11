export type UseHomeViewResult = {
  selectedDate: string;
  doneCount: number;
  totalHabits: number;
  isCodePromptOpen: boolean;
  isFabBuzzing: boolean;
  handleFirstInteraction: () => void;
  openCodePrompt: () => void;
  closeCodePrompt: () => void;
};
