import Image from "next/image";
import { ITrainee } from "../../types";
import { UserIcon } from "@heroicons/react/24/solid";

export function ProfilePicture({
  person,
}: {
  person: { picture?: string; firstName: string; lastName: string };
}) {
  const className = "h-10 w-10 rounded-full";
  if (!person.picture) {
    return (
      <div
        className={`${className} bg-slate-300 flex items-center justify-center`}
      >
        <UserIcon className="h-6 w-6 text-slate-400" />
      </div>
    );
  }

  return (
    <Image
      className={className}
      src={person.picture}
      alt={`Picture of ${person.firstName} ${person.lastName}`}
      width={40}
      height={40}
    />
  );
}
