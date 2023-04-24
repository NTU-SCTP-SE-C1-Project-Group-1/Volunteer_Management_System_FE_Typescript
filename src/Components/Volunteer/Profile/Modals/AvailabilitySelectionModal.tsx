import { useState } from 'react';

// Child Components
import DateAlreadySelected from './modal_components/DateAlreadySelected';
import DateWithEnrolledProgram from './modal_components/DateWithEnrolledProgram';
import DateAlreadyPast from './modal_components/DateAlreadyPast';
import DateSlotSelection from './modal_components/DateSlotSelection';

// Types
import { AvailabilityType } from '../../../../CustomHooks/TypesAndStates';
type Props = {
  value: Date | (Date | null)[] | null;
  availabilities: AvailabilityType[];
};

function AvailabilitySelectionModal({ value, availabilities }: Props) {
  // State for timeslot selection
  const [timeslot, setTimeslot] = useState('');
  // To determine if date has passed
  const today = new Date();
  const selectedDate = new Date(value as Date);
  // SelectedDate in Springboot format
  const selectedDateInSpringFormat = new Date(selectedDate)
    .toLocaleDateString('en-SG')
    .replaceAll('/', '-');
  // Loop through list of availabilities to find matching avail dates
  let findDate = availabilities?.find(
    (avail) => avail.date === selectedDateInSpringFormat
  );

  if (today >= selectedDate) {
    return <DateAlreadyPast />;
  }

  if (findDate && findDate?.avail) {
    return <DateAlreadySelected value={value?.toString() as string} />;
  }

  if (findDate && !findDate?.avail) {
    return <DateWithEnrolledProgram value={value?.toString() as string} />;
  }

  return <DateSlotSelection value={value?.toString() as string} />;
}

export default AvailabilitySelectionModal;
