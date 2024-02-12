import React from "react";

type Props = {
  lastItem: boolean;
  title: string;
  entity: string;
  certificationDate: string;
  link: string;
  icon: string;
};
export const Card = ({
  lastItem,
  title,
  entity,
  certificationDate,
  link,
  icon,
}: Props) => {
  return (
    <div className="w-auto">
      <div className="px-6 py-6">
        <div className="relative text-stone-300 font-medium text-3xl my-3">
          <span className="absolute top-1 icon-[mdi--code-json]"></span>
          <span className="pl-10">{title}</span>
        </div>
        <div className="relative text-stone-300 font-thin my-2">
          <span className={"absolute top-2 text-2xl " + icon}></span>
          <span className="pl-8 text-2xl">{entity}</span>
          <span className="px-3">|</span>
          <span className="absolute top-3 text-xl icon-[mdi--calendar]"></span>
          <span className="pl-7 text-xl">{certificationDate}</span>
        </div>
        <div className="relative text-stone-300 font-thin my-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-white hover:text-cyan-600"
          >
            Mostrar Credencial&nbsp;
            <span className="absolute top-4 text-lg icon-[mdi--open-in-new]"></span>
          </a>
        </div>
      </div>
      { !lastItem &&
        <div className="flex justify-center">
          <hr className="bg-stone-500 border-2 w-11/12 rounded-lg opacity-50" />
        </div>
      }
    </div>
  );
};
