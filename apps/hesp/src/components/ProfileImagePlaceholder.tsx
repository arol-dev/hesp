import { PhotoIcon } from "@heroicons/react/24/solid";
import Image, { ImageProps } from "next/image";

// create a typescript type that if src is not undefined then enforces ImageProps, if not Partial<ImageProps>

export function ProfileImagePlaceholder({
  onFileSelect,
}: {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}) {
  return (
    <div className="flex flex-1 justify-center items-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        <PhotoIcon
          className="mx-auto h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <div className="mt-4 mb-2 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="w-full relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={onFileSelect}
            />
          </label>
          {/* <p className="pl-1">o r drag and drop</p> */}
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, GIF up to 1MB
        </p>
      </div>
    </div>
  );
}
