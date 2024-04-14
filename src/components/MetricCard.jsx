import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MetricCard = ({ title, value }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
