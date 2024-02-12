import React, { useEffect, useState } from "react";

type Props = {
  itemsList: string[];
  mode: string;
};
export const Carousel = ({ itemsList, mode }: Props) => {
  const [navigate, useNavigate] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      handleNavigation("next");
    }, 15000);

    setIntervalId(id);

    return () => {
      if (intervalId) clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, [navigate]);

  const handleNavigation = (navControl: string) => {
    if (intervalId) clearInterval(intervalId);

    const listIndexLength = itemsList.length - 1;    
    const navigatorValue = navControl === "next" ? navigate + 1 : navigate - 1;

    if (navigatorValue > listIndexLength) {
      useNavigate(() => 0);
      return;
    }
    if (navigatorValue === -1) {
      useNavigate(() => listIndexLength);
      return;
    }

    useNavigate(() => navigatorValue);
  };

  return (
    <div className="relative text-center">
      <div className="flex justify-between items-center text-white">
        <div
          className="cursor-pointer"
          onClick={() => handleNavigation("prev")}
        >
          <span className="text-xl icon-[mdi--arrow-left]"></span>
        </div>
        <div className="inset-0 flex justify-center items-center">
          {mode === "text" ? (
            <div className="text-base px-2">{itemsList[navigate]}</div>
          ) : (
            <img src={itemsList[navigate]} className="h-auto w-auto border-2 border-indigo-900 rounded-lg" />
          )}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleNavigation("next")}
        >
          <span className="text-xl icon-[mdi--arrow-right]"></span>
        </div>
      </div>
    </div>
  );
};
