import Calendar from 'react-calendar';
import '../../../../node_modules/react-calendar/dist/Calendar.css';

type Props = {
  onChange: React.Dispatch<React.SetStateAction<Date | (Date | null)[] | null>>;
  value: Date | (Date | null)[] | null;
  showWeekNumbers: boolean | undefined;
  statusMsg: string;
};

function CalendarComponent({
  onChange,
  value,
  showWeekNumbers,
  statusMsg,
}: Props) {
  return (
    <div className="calendar-container flex flex-col flex-wrap flex justify-center items-center">
      <Calendar
        onChange={(nextValue) => onChange(nextValue)}
        showWeekNumbers={showWeekNumbers}
        value={value as Date}
      />
      <div className="flex justify-center items-baseline space-x-3">
        <p className="text-center">
          <span className="font-bold text-blue-800 text-center">
            Selected Date:{' '}
          </span>{' '}
          {value?.toString().substring(0, 15)}
        </p>
        <label
          htmlFor="my-modal-4"
          className="btn btn-xs btn-error text-white text-xs"
        >
          Set Avail
        </label>
      </div>
      <div className="w-[350px]">
        <p className="text-md text-green-600 font-semibold text-center">
          {statusMsg}
        </p>
      </div>
    </div>
  );
}

export default CalendarComponent;
