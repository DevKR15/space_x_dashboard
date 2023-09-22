import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUpcomingLaunches } from '../redux/actions';

const GET_LAUNCHES = gql`
  query GetLaunches {
    launchNext {
      id
      launch_date_local
      launch_date_utc
      launch_site {
        site_id
        site_name
      }
      mission_name
    }
  }
`;

const columns = [
  { id: 'launch_date_local', label: 'Launch date', minWidth: 170 },
  { id: 'launch_site', label: 'Launch site', minWidth: 100 },
  {
    id: 'mission_name',
    label: 'Mission',
    minWidth: 170,
  },
];

function createData(launch_date_local, launch_site, mission_name) {
  return { launch_date_local, launch_site, mission_name };
}

export default function UpcomingLaunches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  const dispatch = useDispatch();
  const rows = [];

  if (data) {
    dispatch(setUpcomingLaunches(data.launchNext));
  }

  const upcomingLaunches = useSelector((state) => state.upcomingLaunches);

  if (upcomingLaunches.length > 1) {
    upcomingLaunches.forEach((element, key) => {
      rows.push(
        createData(
          moment(element.launch_date_local).format('MMM Do YYYY'),
          element.launch_site,
          element.mission_name
        )
      );
    });
  } else {
    rows.push(
      createData(
        moment(upcomingLaunches.launch_date_local).format('MMM Do YYYY'),
        upcomingLaunches.launch_site,
        upcomingLaunches.mission_name
      )
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="bg-gray-100">
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
