import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import { reseedDatabase } from '../../store/actions/authActions';
import { getGen } from '../../store/actions/getGen';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import ARKW from './ARKG.json';
import './styles.css';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { useTheme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// import { DataGrid } from '@material-ui/data-grid';
// const theme = createMuiTheme();
// import NoSsr from '@material-ui/core/NoSsr';
// import { ThemeProvider } from 'styled-components';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import T from './TT.js';

const columns2 = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows2 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
//   typography: {
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//   },
// });

function Demo() {
  return (
    <Box
      color="primary.main"
      bgcolor="background.paper"
      fontFamily="h6.fontFamily"
      fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
      p={{ xs: 2, sm: 3, md: 4 }}
    >
      @material-ui/system
    </Box>
  );
}

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// const theme = {
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// };

// "date": "10/16/2020",
// 	"company": "INVITAE CORP",
// 	"ticker": "NVTA",
// 	"shares": "6298765.00",
// 	"value": "296230917.95",
// 	"percent": "9.67"
const columns = [
  { name: 'company', header: 'company', defaultFlex: 1 },
  { name: 'ticker', header: 'ticker', defaultFlex: 1 },
  { name: 'ticker', header: 'ticker', defaultFlex: 1 },
  { name: 'shares', header: 'shares', defaultFlex: 1 },
  { name: 'value', header: 'value', defaultFlex: 1 },
  { name: 'percent', header: 'percent', defaultFlex: 1 },
];

var rows = [
  {
    date: '10/16/2020',
    company: 'INVITAE CORP',
    ticker: 'NVTA',
    shares: '6298765.00',
    value: '296230917.95',
    percent: '9.67',
  },
  {
    date: '10/16/2020',
    company: 'CRISPR THERAPEUTICS AG',
    ticker: 'CRSP',
    shares: '2537146.00',
    value: '278654745.18',
    percent: '9.10',
  },
  {
    date: '10/16/2020',
    company: 'PACIFIC BIOSCIENCES OF CALIF',
    ticker: 'PACB',
    shares: '15059225.00',
    value: '216401063.25',
    percent: '7.06',
  },
  {
    date: '10/16/2020',
    company: 'ARCTURUS THERAPEUTICS HOLDIN',
    ticker: 'ARCT UQ',
    shares: '2892286.00',
    value: '159451727.18',
    percent: '5.21',
  },
  {
    date: '10/16/2020',
    company: 'TWIST BIOSCIENCE CORP',
    ticker: 'TWST',
    shares: '1635831.00',
    value: '155273078.52',
    percent: '5.07',
  },
  {
    date: '10/16/2020',
    company: 'SERES THERAPEUTICS INC',
    ticker: 'MCRB',
    shares: '3293319.00',
    value: '112137511.95',
    percent: '3.66',
  },
  {
    date: '10/16/2020',
    company: 'IOVANCE BIOTHERAPEUTICS INC',
    ticker: 'IOVA',
    shares: '2981407.00',
    value: '112220159.48',
    percent: '3.66',
  },
  {
    date: '10/16/2020',
    company: 'CAREDX INC',
    ticker: 'CDNA',
    shares: '2154552.00',
    value: '111088701.12',
    percent: '3.63',
  },
  {
    date: '10/16/2020',
    company: 'PERSONALIS INC',
    ticker: 'PSNL',
    shares: '3816194.00',
    value: '101625246.22',
    percent: '3.32',
  },
  {
    date: '10/16/2020',
    company: 'COMPUGEN LTD',
    ticker: 'CGEN',
    shares: '6177420.00',
    value: '97665010.20',
    percent: '3.19',
  },
];

let abc = rows.map((a) => {
  return {
    id: a.ticker,
    ...a,
  };
});

const gridStyle = { minHeight: 550 };



function BasicFilteringGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 36,
  });
  let columns = [
    { field: 'date', width: 120 },
    { field: 'company', width: 200 },
    { field: 'ticker', width: 120 },
    { field: 'shares', width: 150 },
    { field: 'value', width: 150 },
    { field: 'percent', width: 150 },
  ];
  return (
    <div style={{ height: 400, width: '100%', fontFamily: 'sans-serif' }}>
      <DataGrid columns={columns2} rows={abc} />
    </div>
  );
}

const ReseedMessage = ({ handleReseed }) => {
  return (
    <div>
      <span style={{ marginRight: '10px' }}>
        If the app has been vandalized just reseed the database by clicking this button
      </span>
      <button onClick={handleReseed} className="btn reseed-btn">
        Reseed Database
      </button>
    </div>
  );
};

const Home = ({ auth, reseedDatabase, getGen, state }) => {
  console.log(ARKW);
  const handleReseed = () => {
    reseedDatabase();
  };

  // useEffect(() => {
  //   getGen();
  // }, []);

  return (
    // <Layout>
    <div className="home-page">
      <h1>Home page</h1>
      <Demo />
      <p>hello world!!!</p>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows2} columns={columns2} pageSize={5} checkboxSelection />
      </div>

      <p>siva</p>

      <T />

      {!auth.isAuthenticated ? (
        <div>
          <p>
            Welcome guest!{' '}
            <Link className="bold" to="/login">
              Log in
            </Link>{' '}
            or{' '}
            <Link className="bold" to="/register">
              Register
            </Link>
          </p>
          <ReseedMessage handleReseed={handleReseed} />
        </div>
      ) : (
        <>
          <p>
            Welcome <span className="name">{auth.me.name}</span>!
          </p>
          <ReseedMessage handleReseed={handleReseed} />
          <MessageForm />
        </>
      )}
      <MessageList />
    </div>
    // </Layout>
  );
};

const mapStateToProps = (state) => ({
  state,
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase, getGen }))(Home);
