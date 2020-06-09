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
        <ListItemText primary="TRANG CHỦ" />
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
        <ListItemText primary="ẢNH NỀN" />
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
        <ListItemText primary="NHÂN VIÊN" />
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
        <ListItemText primary="HOẠT ĐỘNG" />
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
        <ListItemText primary="BÀI VIẾT" />
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
        <ListItemText primary="BÀI VIẾT ĐANG CHỜ" />
      </ListItem>
    </div>
  );
};

export default DashboardItemComponent;
