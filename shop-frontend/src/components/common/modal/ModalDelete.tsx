export interface ModalProps {
  active: boolean;
  setActive: () => void;
  onConfirm: () => void;
  message: string;
}

const ModalDelete: React.FC<ModalProps> = ({
  active,
  setActive,
  onConfirm,
  message,
}) => {
  return (
    <>
      {active && (
        <div
          onClick={setActive}
          className=" h-screen , w-screen , fixed , bg-black bg-opacity-40 flex justify-center items-center top-0 left-0"
        >
          <div
            onClick={(e) => {
              e.stopPropagation(); // щоб не реагувало на клік по контенту
            }}
            className="bg-white rounded-sm relative py-2 px-4 pb-12"
          >
            {message}
            <div
              onClick={onConfirm}
              className="py-1 px-2 rounded-md absolute left-0 bg-green-600 ml-2 mt-3 cursor-pointer hover:bg-green-500"
            >
              Confirm
            </div>
            <div
              onClick={setActive}
              className="py-1 px-2 rounded-md absolute right-0 bg-red-600 mr-2 mt-3  cursor-pointer hover:bg-red-500"
            >
              Cansel
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDelete;
