import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TotalSalesCard = ({ totalSales, titulo }) => {
  return (
    <Card
      variant="outlined"
      sx={{ width: 275 }}
      style={{ textAlign: "center" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="h5" component="div">
          {totalSales}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalSalesCard;
