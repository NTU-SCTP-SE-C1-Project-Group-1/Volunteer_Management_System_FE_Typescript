import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../../../Context/AuthContext';
// Types
import { ProfileType } from '../../../../CustomHooks/TypesAndStates';
// APIs
import { editProfileById } from '../../../../CustomHooks/ApiActions';

type Props = {
  profile: ProfileType;
  id: string | number;
};

function ProfileEdit({ profile, id }: Props) {
  const redirect = useNavigate();
  const { authUser } = useGlobalAuthContext();
  const [form, setForm] = useState<ProfileType>(profile);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const queryClient = useQueryClient();

  // Timeout for error msg
  const timeout = () => setTimeout(() => setErrorMsg(() => ''), 3000);

  // API
  const { mutate } = useMutation({
    mutationFn: editProfileById,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['profile']);
      redirect(`/admin/volunteers/${id}`);
    },
    onError: (err: any) => {
      setErrorMsg(err?.message);
      timeout();
    },
  });

  // Form - onchange
  const changeHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form - submit
  const submitProfileEdit = () => {
    const body = {
      token: authUser?.accessToken,
      id: id as string,
      reqBody: {
        interests: form.interests,
        hobbies: form.hobbies,
        professionalExperience: form.professionalExperience,
        profilePicture: form.profilePicture,
      },
    };
    mutate(body);
  };

  return (
    <>
      <div className="h-auto min-h-[75vh]">
        <h1 className="text-3xl font-bold">
          Profile Edit for {form?.volunteer?.name}
        </h1>
        <div className="flex flex-col mt-4">
          {/* 1st Row Inputs */}
          <div className="flex space-x-8">
            <div className="flex flex-col">
              <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="name">
                Interests:
              </label>
              <input
                id="interests"
                name="interests"
                value={form?.interests}
                onChange={changeHandler}
                placeholder="Main interests"
                type="text"
                className="input input-bordered input-info w-[35vw] input-md"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 pl-2 font-semibold text-sm"
                htmlFor="hobbies"
              >
                Hobbies:
              </label>
              <input
                id="hobbies"
                name="hobbies"
                value={form?.hobbies}
                onChange={changeHandler}
                placeholder="Volunteer's hobbies and likes"
                type="text"
                className="input input-bordered input-info w-[35vw] input-md"
              />
            </div>
          </div>

          {/* 3rd Row Inputs */}
          <div className="flex space-x-12 mt-5">
            <div className="flex flex-col">
              <label
                className="pb-2 pl-2 font-semibold text-sm"
                htmlFor="profilePicture"
              >
                Profile Image Upload:
              </label>
              <input
                id="profilePicture"
                name="profilePicture"
                value={form?.profilePicture}
                onChange={changeHandler}
                placeholder="Image URL"
                className="input input-bordered input-info input-sm w-[40vw]"
              />
            </div>
          </div>

          {/* 5th row Inputs */}
          <div className="flex space-x-8 mt-4">
            <div className="flex flex-col w-full">
              <label
                className="pb-2 pl-2 font-semibold text-sm"
                htmlFor="experience"
              >
                Professional Experience:
              </label>
              <textarea
                name="professionalExperience"
                id="professionalExperience"
                value={form?.professionalExperience}
                onChange={changeHandler}
                className="textarea textarea-info w-auto textarea-md h-[25vh] md:w-[75vw]"
                placeholder="Describe volunteer's professional experience, if any."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center p-4 space-x-4">
          <button
            onClick={() => redirect(`/admin/volunteers/${id}`)}
            className="btn btn-error btn-sm text-white"
          >
            Cancel
          </button>
          <button
            onClick={submitProfileEdit}
            className="btn btn-success btn-sm text-white"
          >
            Submit
          </button>
        </div>
        <p className="py-0 h-[5px] text-red-500 text-center">{errorMsg}</p>
      </div>
    </>
  );
}

export default ProfileEdit;
