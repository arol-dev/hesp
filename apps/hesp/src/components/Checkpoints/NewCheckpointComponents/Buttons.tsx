interface IButton {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  text: string
  dataCy: string
}

export const SaveButton = ({ onClick, text, dataCy }: IButton) => (
  <span className="sm:ml-3">
    <button
      data-cy={dataCy}
      onClick={onClick}
      type="button"
      className={`inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm'
          }`}
    >
      {text}
    </button>
  </span >
);



export const SwitchButton = ({ onClick, text, dataCy }: IButton) => (

  <span className="hidden sm:block">
    <button
      data-cy={dataCy}
      onClick={onClick}
      type="button"
      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <svg
        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
      </svg>
      {text}
    </button>
  </span>
)


