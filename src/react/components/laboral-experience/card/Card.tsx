import { useEffect, useRef, useState } from "react";
import { Carousel } from "../../shared/Carousel";
import type { Height } from "react-animate-height";
import AnimateHeight from "react-animate-height";

type Period = {
  from: string;
  to: string;
};
type Props = {
  role: string;
  company: string;
  client: string;
  description: string;
  responsabilities: string[];
  period: Period;
  techs: string[];
};
export const Card = ({
  role,
  company,
  client,
  description,
  responsabilities,
  period,
  techs,
}: Props) => {
  const [showAll, setShowAll] = useState(false);

  const [height, setHeight] = useState<Height>('auto');
  const contentDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = contentDiv.current as HTMLDivElement;

    const resizeObserver = new ResizeObserver(() => {
      setHeight(element.clientHeight + 18);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <AnimateHeight
    height={height}
    contentClassName="auto-content"
    contentRef={contentDiv}
    disableDisplayNone
  >
    <div className="max-w-xs border-purple-950 border-2 bg-gradient-to-b from-cyan-950 to-gray-800 my-4">
      <div className="px-6 py-4">
        <div className="relative text-stone-300 font-medium text-3xl my-3">
          <span className="absolute top-1 icon-[mdi--company]"></span>
          <span className="pl-10">{company}</span>
        </div>
        <div className="relative text-stone-300 font-thin text-xl my-3">
          <span className="absolute top-1 icon-[mdi--user-tie]"></span>
          <span className="pl-7">{client}</span>
        </div>
        <div className="relative text-stone-300 font-thin text-xl my-3">
          <span className="absolute top-1 icon-[mdi--calendar]"></span>
          <span className="pl-7">{period.from} - {period.to || 'Actualmente'}</span>
        </div>
        <div className="text-stone-300 font-bold text-lg my-3">{role}</div>
        <p className="text-gray-200 text-base">{description}</p>
      </div>

      <div className="px-6 pt-2 pb-6 h-28">
        <Carousel itemsList={responsabilities} mode={'text'} />
      </div>
      <div className="px-6 py-6">
        {techs.length > 4 && (
          <button
            onClick={handleClick}
            className="text-violet-500 hover:text-violet-800 flex justify-start"
          >
            {showAll ? (
              <>
                <span className="icon-[mdi--hide]"></span>
                <span className="text-lg pl-2">Ver menos</span>
              </>
            ) : (
              <>
                <span className="icon-[mdi--show]"></span>
                <span className="text-lg pl-2">Ver m&aacute;s</span>
              </>
            )}
          </button>
        )}
        {techs.slice(0, showAll ? techs.length : 4).map((tech, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    </AnimateHeight>
  );
};
