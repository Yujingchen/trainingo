import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import tableStyle from './tableStyle';
import ActionCell from './ActionCell';
import SortIcon from '@material-ui/icons/Sort';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    actionColumns,
    onSortClick
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                    <Tooltip placement="right" title="Sort">
                      <Button
                        mini={true}
                        color="primary"
                        onClick={() => onSortClick(prop)}
                      >
                        <SortIcon />
                      </Button>
                    </Tooltip>

                  </TableCell>
                );
              })}
              {actionColumns.length > 0 && (
                <TableCell
                  className={
                    classes.tableCell +
                    ' ' +
                    classes.tableHeadCell +
                    ' ' +
                    classes.alignCenter
                  }
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData && typeof tableData === 'object' && tableData.constructor === Array ? (tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.map((item, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {item}
                    </TableCell>
                  );
                })}
                <ActionCell actionColumns={actionColumns} rowData={prop} />
              </TableRow>
            );
          })) : null
          }
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  actionColumns: []
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
