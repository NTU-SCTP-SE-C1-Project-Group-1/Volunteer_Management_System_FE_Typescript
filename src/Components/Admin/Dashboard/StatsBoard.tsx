import StatsItem from './StatsItem';
import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';

function StatsBoard() {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-[85%]">
      <StatsItem
        title={'Volunteers'}
        stats={100}
        text={'Total Enrolled'}
        link={'/'}
        color={"'bg-slate-100'"}
        icon={<BsPeopleFill size={100} color={'lightblue'} />}
        red={false}
      />
      <StatsItem
        title={'Interviews'}
        stats={100}
        text={'Pending Profiles'}
        link={'/'}
        color={"'bg-slate-100'"}
        icon={<TbHeartHandshake size={100} color={'lightblue'} />}
        red={false}
      />
      <StatsItem
        title={'Programs'}
        stats={100}
        text={'Active Programs'}
        link={'/'}
        color={"'bg-slate-100'"}
        icon={<IoAccessibility size={100} color={'lightblue'} />}
        red={false}
      />
      <StatsItem
        title={'Completion'}
        stats={100}
        text={'Completed'}
        link={'/'}
        color={"'bg-slate-100'"}
        icon={<GiFinishLine size={100} color={'lightblue'} />}
        red={false}
      />
    </div>
  );
}

export default StatsBoard;
