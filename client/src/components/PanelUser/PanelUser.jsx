/*eslint-disable*/
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import PanelWallet from '../PanelWallet/PanelWallet';
import Profile from '../Profile/Profile';
import PanelTransactions from '../PanelTransactions/PanelTransactions';

import style from "./PanelUser.module.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoins, getUserInfo, postUser } from '../../redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

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

export default function PanelUser() {
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const allCoins = useSelector((state) => state.allCoins);
  const [user, setUser] = React.useState({
    email: "",
    uid: "",
  });

    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
          ...user,
          email: currentUser.email,
          uid: currentUser.uid,
          //password: currentUser.password,
        });
        console.log(user);
        dispatch(postUser(currentUser));
        } else {
          console.log("SIGNED OUT");
          setUser({
            email: "",
            uid: "",
          });
        }
      });
    }, [dispatch, userInfo]);

    useEffect(() => {
      dispatch( getUserInfo(user.email));
   }, [user.email]);

   useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'lightpink' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary">
          <Tab label="Wallet" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
          <Tab label="Profile" {...a11yProps(2)} />
 
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {
          userInfo && allCoins.length ?
          <PanelWallet
          userInfo={userInfo}
          allCoins={allCoins}
          />
          :
          <div>
            <img src={"https://cryptosaurs.one/wp-content/uploads/2021/10/cryptosaurs-1.gif"} className={style.imgLoading}/>
            <h1 className={style.textLoading}>Loading...</h1>
          </div>
        }
      </TabPanel>

      <TabPanel value={value} index={1}>
       <PanelTransactions />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Profile />
      </TabPanel>

    </Box>
  );
}