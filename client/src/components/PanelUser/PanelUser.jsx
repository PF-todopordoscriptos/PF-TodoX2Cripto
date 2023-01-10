/*eslint-disable*/
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Profile from "../Profile/Profile";

import style from "./PanelUser.module.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PanelUser() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "lightpink" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Wallet" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
          <Tab label="Profile" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {/* <Profile /> */}
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2278b3fc-f672-4faf-a444-beeb961b3837/d9iwbur-eae690d3-1b68-4763-9316-9f15ea02393f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyNzhiM2ZjLWY2NzItNGZhZi1hNDQ0LWJlZWI5NjFiMzgzN1wvZDlpd2J1ci1lYWU2OTBkMy0xYjY4LTQ3NjMtOTMxNi05ZjE1ZWEwMjM5M2YuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cLrBuisJyHOpEahuVOFNyZgzN8g0LYS6rXe1b7MsYlY" />
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* <Profile /> */}
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2278b3fc-f672-4faf-a444-beeb961b3837/d9iwbur-eae690d3-1b68-4763-9316-9f15ea02393f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyNzhiM2ZjLWY2NzItNGZhZi1hNDQ0LWJlZWI5NjFiMzgzN1wvZDlpd2J1ci1lYWU2OTBkMy0xYjY4LTQ3NjMtOTMxNi05ZjE1ZWEwMjM5M2YuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cLrBuisJyHOpEahuVOFNyZgzN8g0LYS6rXe1b7MsYlY" />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Profile />
        {/* <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2278b3fc-f672-4faf-a444-beeb961b3837/d9iwbur-eae690d3-1b68-4763-9316-9f15ea02393f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyNzhiM2ZjLWY2NzItNGZhZi1hNDQ0LWJlZWI5NjFiMzgzN1wvZDlpd2J1ci1lYWU2OTBkMy0xYjY4LTQ3NjMtOTMxNi05ZjE1ZWEwMjM5M2YuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cLrBuisJyHOpEahuVOFNyZgzN8g0LYS6rXe1b7MsYlY" /> */}
      </TabPanel>
    </Box>
  );
}
