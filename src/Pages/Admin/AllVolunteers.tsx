import VolunteerList from '../../Components/Admin/Volunteers/ListPage/VolunteerList';

function AllVolunteers() {
  return (
    <div className="flex flex-col px-12 h-auto md:h-screen md:px-40 mt-28 mb-4">
      <VolunteerList />
    </div>
  );
}

export default AllVolunteers;
