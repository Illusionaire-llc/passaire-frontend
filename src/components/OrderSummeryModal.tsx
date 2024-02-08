type Props = {
  ticketPrice: number | undefined;
  quantity: number | undefined;
  totalPrice: number | undefined;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  setClose: () => void;
  submitHandler: () => void;
};
const OrderSummeryModal = ({
  setClose,
  submitHandler,
  isPending,
  isSuccess,
  error,
  isError,
}: Props) => {
  return (
    <div className="fixed z-30 flex items-center justify-center inset-0 bg-zinc-800 bg-opacity-60">
      <div className="absolute left-1/2 top-1/2 max-md:w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-100 px-4 py-6">
        <h3 className="text-3xl uppercase font-semibold">order confirmation</h3>
        {isError && (
          <div className="w-full flex items-center justify-center mb-6 mt-3 py-2 px-2 rounded-md bg-red-200 bg-opacity-70 mt-8">
            <small className="capitalize text-red-700 font-semibold text-center">
              {error?.message}
            </small>
          </div>
        )}
        <div className="w-full flex items-center justify-center gap-3 max-sm:flex-col mt-14">
          <button
            type="button"
            className="w-1/2 max-sm:w-full flex items-center justify-center px-6 py-2 bg-secondary-100 text-white rounded-md font-semibold capitalize disabled:bg-slate-400"
            onClick={submitHandler}
            disabled={isPending || isSuccess}
          >
            {!isPending && <p>register</p>}
            {isPending && (
              <span className="flex w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin"></span>
            )}
          </button>
          <button
            type="button"
            className="w-1/2 max-sm:w-full px-6 py-2 bg-black text-white rounded-md font-semibold capitalize"
            onClick={setClose}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummeryModal;
