import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AdminDashboardCoins from '../AdminDashboardCoins/AdminDashboardCoins';
import AdminDashboardUsers from '../AdminDashboardUsers/AdminDashboardUsers';
import AdminDashboardChanges from '../AdminDashboardChanges/AdminDashboardChanges';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PanelAdmin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="COINS" {...a11yProps(0)} />
          <Tab label="USERS" {...a11yProps(1)} />
          <Tab label="CHANGES" {...a11yProps(2)} />
          <Tab label="TRANSACTIONS" {...a11yProps(3)} />
          <Tab label="WARNINGS" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <AdminDashboardCoins />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <AdminDashboardUsers />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <AdminDashboardChanges />
      </TabPanel>

      <TabPanel value={value} index={3}>
        {/* <AdminDashboardChanges /> */}
      </TabPanel>

      <TabPanel value={value} index={4}>
        {/* <AdminDashboardChanges /> */}
      </TabPanel>

    </Box>
  );
}