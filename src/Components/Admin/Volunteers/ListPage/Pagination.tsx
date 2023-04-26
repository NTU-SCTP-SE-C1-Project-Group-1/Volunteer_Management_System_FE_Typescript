type Props = {
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ totalPages, setPage }: Props) {
  return (
    <div className="btn-group flex justify-center items-center pb-4 text-white">
      {totalPages > 0 ? (
        [...new Array(totalPages).fill(true)].map((page, index) => (
          <button
            onClick={() => setPage(index + 1)}
            key={index}
            className={`btn btn-md text-white ${
              index + 1 === page ? 'btn-primary' : 'btn-info'
            }`}
          >
            {index + 1}
          </button>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Pagination;
