import StatsItem from './StatsItem';
import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';

import {
  ProfileType,
  EnrolmentType,
} from '../../../CustomHooks/TypesAndStates';

type Props = {
  profiles: ProfileType[];
  enrolments: EnrolmentType[];
};

// Get pending interviews
function StatsBoard({ profiles, enrolments }: Props) {
  let checkCompletion: ProfileType[] = profiles?.filter(
    (profile) =>
      profile.interests === '' ||
      profile.hobbies === '' ||
      profile.professionalExperience === ''
  );

  // Get completed programs
  const dates = enrolments?.map((enrol: any) =>
    enrol.date.split('-').reverse().join('-')
  );

  const today = new Date();

  const pastDue = dates?.filter((date) => today >= new Date(date));

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-[85%]">
      <StatsItem
        title={'Volunteers'}
        stats={profiles?.length}
        text={'Total Enrolled'}
        link={'/admin/volunteers'}
        color={"'bg-slate-100'"}
        icon={<BsPeopleFill size={100} color={'lightblue'} />}
        red={false}
      />
      <StatsItem
        title={'Interviews'}
        stats={checkCompletion?.length}
        text={'Pending Profiles'}
        link={'/admin/volunteers'}
        color={"'bg-slate-100'"}
        icon={<TbHeartHandshake size={100} color={'lightblue'} />}
        red={false}
      />
      <StatsItem
        title={'Programs'}
        stats={enrolments?.length}
        text={'Active Programs'}
        link={'/admin/programs'}
        color={"'bg-slate-100'"}
        icon={<IoAccessibility size={100} color={'lightblue'} />}
        red={false}
      />
      <StatsItem
        title={'Completion'}
        stats={pastDue?.length}
        text={'Completed'}
        link={'/admin/programs'}
        color={"'bg-slate-100'"}
        icon={<GiFinishLine size={100} color={'lightblue'} />}
        red={false}
      />
    </div>
  );
}

export default StatsBoard;
