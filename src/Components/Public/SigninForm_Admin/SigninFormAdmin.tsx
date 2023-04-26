// Props Type
interface SigninProps {
  onSubmitHandler: (e: React.SyntheticEvent) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  form: {
    email: string;
    password: string;
  };
  errorMsg: string;
}

function SigninAdminForm({
  onSubmitHandler,
  onChangeHandler,
  showPassword,
  setShowPassword,
  form,
  errorMsg,
}: SigninProps) {
  return (
    <>
      <form onSubmit={onSubmitHandler} className="mt-4">
        <div className="flex flex-col justify-center items-center space-y-8">
          <input
            type="text"
            onChange={onChangeHandler}
            name="email"
            value={form?.email}
            placeholder="Email"
            className="input input-bordered input-info w-[40vw] lg:w-[70vw] max-w-xs"
          />
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            onChange={onChangeHandler}
            name="password"
            value={form?.password}
            placeholder="Password"
            className="input input-bordered input-info  w-[40vw] lg:w-[70vw] max-w-xs"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="form-group form-check flex justify-center items-center">
            <input
              type="checkbox"
              className="form-check-input h-4 w-4 border border-gray-500 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck2"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label inline-block text-gray-800 text-lg">
              <p className="text-xs">Show password</p>
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button className="btn btn-info w-full text-white">Sign in</button>
        </div>
      </form>
      <p className="py-0 h-[5px] text-red-500">{errorMsg}</p>
    </>
  );
}

export default SigninAdminForm;
