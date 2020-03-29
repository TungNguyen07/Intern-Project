import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CategoryIcon from "@material-ui/icons/Category";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import PanoramaIcon from "@material-ui/icons/Panorama";
import HomeIcon from "@material-ui/icons/Home";
import Router from "next/router";

const DashboardItemComponent = ({ setState }) => {
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          Router.push("/");
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="HOME" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setState("BANNER");
        }}
      >
        <ListItemIcon>
          <PanoramaIcon />
        </ListItemIcon>
        <ListItemText primary="BANNER" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setState("USER");
        }}
      >
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="USER" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setState("ACTIVITY");
        }}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="ACTIVITY" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setState("POST");
        }}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="POST" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setState("PENDING_POST");
        }}
      >
        <ListItemIcon>
          <AssignmentLateIcon />
        </ListItemIcon>
        <ListItemText primary="PENDING POST" />
      </ListItem>
    </div>
  );
};

export default DashboardItemComponent;
