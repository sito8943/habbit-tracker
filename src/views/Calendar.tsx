import { Calendar as CalendarView } from "../components";
import { useCalendarView } from "../hooks";

const Calendar = () => {
  const { logs, selectedDate, onSelectDate } = useCalendarView();

  return <CalendarView logs={logs} selectedDate={selectedDate} onSelectDate={onSelectDate} />;
};

export default Calendar;
