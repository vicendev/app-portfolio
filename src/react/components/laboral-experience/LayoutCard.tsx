import { useState } from "react";
import laboralExperienceData from "../../../data/laboral_experience.json";
import { Card } from "./card/Card";
import moment from "moment";

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

export const LayoutCard = (): JSX.Element => {
  const [laboralExperiences] = useState(
    laboralExperienceData as Props[]
  );

  return (
    <>
      {laboralExperiences.sort((a, b) => {
        const today = moment().format('DD/MM/YYYY');
        const aDate = moment(a.period.to || today, 'DD/MM/YYYY').toDate().valueOf();
        const bDate = moment(b.period.to || today, 'DD/MM/YYYY').toDate().valueOf();
       
        return bDate - aDate
      }).map((labExp, index) => (
        <Card
          key={index}
          client={labExp.client}
          company={labExp.company}
          description={labExp.description}
          period={labExp.period}
          responsabilities={labExp.responsabilities}
          role={labExp.role}
          techs={labExp.techs}
        />
      ))}
    </>
  );
};
