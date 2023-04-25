import { Link } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';

function Banners() {
  return (
    <>
      <div className="hidden h-auto lg:h-[18vh] w-[100%] mt-4 lg:flex justify-center">
        <div className="hidden flex-col stats md:flex md:flex-row justify-center items-center space-y-4 shadow w-screen h-auto lg:h-[18vh] mx-32 ">
          <Link to="/admin/programkickstarter">
            <div className="stat w-[18%] lg:w-[25%]">
              <div className="stat-figure text-success">
                <BsPeopleFill size={40} />
              </div>
              <div className="stat-title font-bold">Program Kickstarter</div>
              <div className="stat-value text-success">Builder</div>
              <div className="stat-desc">Create programs with ease</div>
            </div>
          </Link>
          <div className="stat w-[18%] lg:w-[25%]">
            <div className="stat-figure text-blue-400">
              <TbHeartHandshake size={45} />
            </div>
            <div className="stat-title font-bold">Relations Management</div>
            <div className="stat-value text-blue-400">Productivity</div>
            <div className="stat-desc">Build and manage relations</div>
          </div>

          <div className="stat w-[18%] lg:w-[25%]">
            <div className="stat-figure text-teal-500">
              <IoAccessibility size={45} />
            </div>
            <div className="stat-title font-bold">Enrolments</div>
            <div className="stat-value text-teal-600">Fullfilment</div>
            <div className="stat-desc">Ongoing</div>
          </div>

          <div className="stat w-[18%] lg:w-[25%]">
            <div className="stat-figure text-secondary">
              <GiFinishLine size={45} />
            </div>
            <div className="stat-value text-pink-500">86%</div>
            <div className="stat-title tracking-widest">Participation Rate</div>
            <div className="stat-desc text-secondary">Programs Success</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banners;
