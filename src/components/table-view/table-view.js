import React, { Component } from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';

/* eslint-disable */
export class Columns extends Component {
  render() {
    const { dataProvider, children } = this.props;
    const columns = children.map(column => column.props);

    return (
      <table className="table-view">
        <TableHeader children={children} />
        <TableBody dataProvider={dataProvider} columns={columns} />
      </table>
    );
  }
}

export class TableHeader extends Component {
  render() {
    const { children } = this.props;
    const columns = children.map((child, idx) => {
      const { headerRenderer: HeaderRenderer = TableColumn } = child.props;
      return <HeaderRenderer key={idx} data={'data'} {...child.props} />;
    });
    return (
      <thead className="table-view__header">
        <tr className="table-view__header-row">
          {columns}
        </tr>
      </thead>
    );
  }
}

export class TableColumn extends Component {
  render() {
    const { headerText } = this.props;
    return (
      <th className="table-view__header-cell">
        {headerText}
      </th>
    );
  }
}

TableColumn.propTypes = {
  dataField: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired
};

export class TableBodyCell extends Component {
  render() {
    const { row, dataField, column } = this.props;
    const Formatter = column.formatter;
    return (
      <td className="table-view__body-cell">
        {Formatter
          ? <Formatter input={get(row, dataField)} />
          : get(row, dataField)}
      </td>
    );
  }
}

export class TableBodyRow extends Component {
  render() {
    const { row, children, columns } = this.props;
    const cells = columns.map((column, idx) => {
      const ItemRenderer = column.itemRenderer ? column.itemRenderer : TableBodyCell;
      return (
        <ItemRenderer
          key={idx}
          row={row}
          dataField={column.dataField}
          column={column}
        />
      );
    });

    return (
      <tr className="table-view__body-row">
        {cells}
      </tr>
    );
  }
}

export class TableBody extends Component {
  render() {
    const { dataProvider, columns } = this.props;
    const rows = dataProvider.map((row, idx) =>
      <TableBodyRow key={idx} row={row} columns={columns} />
    );
    return (
      <tbody className="table-view__body">
        {rows}
      </tbody>
    );
  }
}

export class ItemRenderer extends Component {
  render() {
    return (
      <td>
        {this.props.children}
      </td>
    );
  }
}

class TableView extends Component {
  constructor() {
    super();
    this.grid = null;
  }

  componentDidMount() {
    this.grid.addEventListener('scroll', evt => {
      console.log('scrollTop evt', evt.target.scrollTop);
    });
  }

  render() {
    const { dataProvider, children } = this.props;
    const columns = React.Children.toArray(children).map(child =>
      React.cloneElement(child, {
        dataProvider: dataProvider
      })
    );
    return (
      <div ref={grid => (this.grid = grid)} className="table-wrapper">
        {columns}
      </div>
    );
  }
}

export default TableView;
