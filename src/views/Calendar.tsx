import { useNavigate } from "react-router";
import { Calendar as CalendarView } from "../components";
import { useHabitsContext } from "../providers";

const Calendar = () => {
  const { logs, selectedDate, selectDate } = useHabitsContext();
  const navigate = useNavigate();

  return (
    <CalendarView
      logs={logs}
      selectedDate={selectedDate}
      onSelectDate={(date) => {
        selectDate(date);
        navigate("/");
      }}
    />
  );
};

export default Calendar;
