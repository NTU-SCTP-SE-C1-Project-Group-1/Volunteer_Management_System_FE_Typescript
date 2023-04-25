import { Link } from 'react-router-dom';

type Props = {
  link: string;
  stats: number;
  title: string;
  text: string;
  color: string;
  icon: React.ReactNode;
  red: boolean;
};

function StatsItem({
  link,
  stats,
  title,
  text,
  color,
  icon,
  red = false,
}: Props) {
  return (
    <>
      <Link to={link} className="no-underline">
        <div
          className={`border h-[190px] w-[65vw] justify-between md:w-[85%] border-gray-200 flex md:justify-center p-9 py-2 space-x-10 rounded-lg ${color} text-white shadow-2xl`}
        >
          <div className="flex flex-col">
            <div>
              <p className="font-bold text-2xl text-teal-400 tracking-widest">
                {title}
              </p>
              <p className={`text-6xl mt-[5px] font-bold text-blue-500`}>
                {stats}
              </p>
            </div>
            <div>
              <p
                className={`font-bold mt-[-35px] text-[16px] ${
                  red ? 'text-red-300' : 'text-slate-500'
                }`}
              >
                {text}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {icon}
          </div>
        </div>
      </Link>
    </>
  );
}

export default StatsItem;
