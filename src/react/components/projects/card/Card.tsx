import React, { useEffect, useRef, useState } from "react";
import type { Height } from "react-animate-height";
import AnimateHeight from "react-animate-height";
import { Carousel } from "../../shared/Carousel";

type GitHubProps = {
  front: string;
  back: string;
};

type Props = {
  title: string;
  github: GitHubProps;
  link: string;
  lastUpdate: string;
  description: string;
  video: string;
  images: string[];
  techs: string[];
};
export const Card = ({
  title,
  github,
  link,
  lastUpdate,
  description,
  video,
  images,
  techs,
}: Props) => {
  const [showAll, setShowAll] = useState(false);

  const [height, setHeight] = useState<Height>("auto");
  const contentDiv = useRef<HTMLDivElement | null>(null);

  const hasValuesGitHub = Object.values(github).some((value) => !!value);

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
            <span className="absolute top-1 icon-[mdi--code-json]"></span>
            <span className="pl-10">{title}</span>
          </div>
          <div className="relative text-stone-300 font-thin text-xl my-3">
            <span className="absolute top-1 icon-[mdi--calendar]"></span>
            <span className="pl-7">Última actualización {lastUpdate}</span>
          </div>
          <p className="text-gray-200 text-base">{description}</p>
        </div>
        {Boolean(images.length) && (
          <div className="px-6 py-4">
            <Carousel itemsList={images} mode={"image"} />
          </div>
        )}
        {video && (
          <div className="px-6 py-4">
            <iframe
              src={video}
              className="h-auto w-full"
              allow="autoplay"
            ></iframe>
          </div>
        )}
        {link && (
          <div className="px-5 py-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-white hover:text-cyan-600"
          >
            <span className="text-4xl icon-[mdi--web]"></span>
            P&aacute;gina Web
          </a>
          </div>
        )}
        {hasValuesGitHub && (
          <div className="px-5">
            <div className="relative text-stone-300 font-thin text-xl">
              {/* Iterar sobre las propiedades del objeto github */}
              {Object.entries(github).map(([key, value]) => {
                if (value) {
                  return (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white mr-4 hover:text-rose-600"
                    >
                      <span className="text-4xl icon-[mdi--github]"></span>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </a>
                  );
                }
              })}
            </div>
          </div>
        )}
        <div className="px-6 py-4">
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
