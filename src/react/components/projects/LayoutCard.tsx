import React, { useState } from 'react'
import projectsData from "../../../data/projects.json";
import { Card } from './card/Card';

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
export const LayoutCard = (): JSX.Element => {
  const [projects] = useState(
    projectsData as Props[]
  );

  return (
    <>
      {projects.map((project, index) => (
        <Card
          key={index}
          {...project}
        />
      ))}
    </>
  );
}
