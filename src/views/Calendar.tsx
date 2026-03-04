import { useNavigate, useOutletContext } from "react-router";
import { Calendar as CalendarView } from "../components";
import type { ViewContextType } from "../layouts/View";

const Calendar = () => {
  const { logs, selectedDate, selectDate } = useOutletContext<ViewContextType>();
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
