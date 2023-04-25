type Props = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitHandler: (e: React.SyntheticEvent) => void;
};

function ResetForm({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSubmitHandler,
}: Props) {
  return (
    <form onSubmit={onSubmitHandler} className="mt-4">
      <div className="flex flex-col justify-center items-center space-y-8">
        <input
          type={`${showPassword ? 'text' : 'password'}`}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          placeholder="Password"
          className="input input-bordered input-info  w-[40vw] lg:w-[70vw] max-w-xs"
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="form-group form-check flex justify-center items-center">
          <input
            type="checkbox"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id="exampleCheck2"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label inline-block text-gray-800">
            <div className="flex justify-center items-center pt-1 space-x-1">
              <p className="text-xs">Show password</p>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <button className="btn btn-info w-full text-white">Change</button>
      </div>
    </form>
  );
}

export default ResetForm;
