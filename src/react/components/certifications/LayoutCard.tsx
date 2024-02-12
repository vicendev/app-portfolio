import React, { useState } from 'react'
import certificationsData from "../../../data/certifications.json";
import { Card } from './card/Card';
import moment from 'moment';

type Props = {
  title: string;
  entity: string;
  certificationDate: string;
  link: string;
  icon: string;
};

export const LayoutCard = (): JSX.Element => {
  const [certifications] = useState(
    certificationsData as Props[]
  );

  return (
    <>
      {certifications.sort((a, b) => {
        const dateA = moment(a.certificationDate, 'DD/MM/YYYY').toDate().valueOf();
        const dateB = moment(b.certificationDate, 'DD/MM/YYYY').toDate().valueOf();

        return dateB - dateA;
      }).map((certification, index) => (
        <Card
          key={index}
          lastItem={index === certifications.length - 1}
          {...certification}
        />
      ))}
    </>
  );
}
