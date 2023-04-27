import { useState } from 'react';

// Child
import ProgramItem from './ProgramItem';

// Type
import { EnrolmentType } from '../../../CustomHooks/TypesAndStates';

type Props = {
  enrolments: EnrolmentType[];
};

function ProgramsListing({ enrolments }: Props) {
  const filterOptions = (option: string) => {};

  if (!enrolments) {
    return (
      <div className="w-full h-auto md:h-screen mx-auto lg:w-10/12 px-16">
        <div>
          <h1>There are currently no programs listed</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center pb-4 space-x-2">
        <button
          onClick={() => filterOptions('ALL')}
          className="btn btn-primary btn-sm"
        >
          All Programs
        </button>
        <button
          onClick={() => filterOptions('ACTIVE')}
          className="btn btn-success text-white btn-sm"
        >
          Active Programs
        </button>
        <button
          onClick={() => filterOptions('CLOSED')}
          className="btn text-white btn-error btn-sm"
        >
          Closed Programs
        </button>
      </div>

      {/* {enrolments && ( */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {enrolments?.map((enrolment, index) => (
          <ProgramItem enrolment={enrolment} key={index} />
        ))}
      </div>
      {/*    )} */}
    </>
  );
}

export default ProgramsListing;
