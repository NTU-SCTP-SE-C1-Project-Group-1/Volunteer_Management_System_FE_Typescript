// Child Component
import ProgramEdit from '../../Components/Admin/Programs/ProgramEdit';

function ProgramEditPage() {
  return (
    <div className="flex flex-col h-auto md:h-screen p-8 items-center">
      <h3 className="text-4xl font-bold mt-24">Edit Program</h3>
      <ProgramEdit />
    </div>
  );
}

export default ProgramEditPage;
