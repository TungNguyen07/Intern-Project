import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { fetchData } from "../../libs/fetchData";
import { makeStyles } from "@material-ui/core";
const SERVER_URL = process.env.SERVER_URL;

const useStyles = makeStyles({
  root: {
    marginTop: "0.5rem",
  },
});

const VirusInfoComponent = () => {
  const classes = useStyles();
  const [info, setInfo] = useState({});

  useEffect(() => {
    let unmouted = false;
    fetchData(`${SERVER_URL}/info-virus`).then((res) => {
      if (!unmouted) setInfo(res.data);
    });
    return () => {
      unmouted = true;
    };
  }, []);

  return info.global ? (
    <TableContainer className={classes.root} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Statistical Covid-19
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Area</TableCell>
            <TableCell align="right">Cases</TableCell>
            <TableCell align="right">Deaths</TableCell>
            <TableCell align="right">Recovered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="global">
            <TableCell>Global</TableCell>
            <TableCell align="right">{info.global.cases}</TableCell>
            <TableCell align="right">{info.global.deaths}</TableCell>
            <TableCell align="right">{info.global.recovered}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow key="vietnam">
            <TableCell>Vietnam</TableCell>
            <TableCell align="right">{info.vietnam.cases}</TableCell>
            <TableCell align="right">{info.vietnam.deaths}</TableCell>
            <TableCell align="right">{info.vietnam.recovered}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div></div>
  );
};

export default VirusInfoComponent;
