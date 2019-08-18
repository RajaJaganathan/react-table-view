import React, { Component } from "react";
import PropTypes from "prop-types";

import get from "lodash/get";

import "./table-view.css";

/* eslint-disable */
export class Columns extends Component {
  render() {
    const { children, ...rest } = this.props;
    const columns = children.map(column => column.props);
    return (
      <div>
        <table className="table-view">
          <TableHeader children={children} />
          <TableBody {...rest} columns={columns} />
        </table>
      </div>
    );
  }
}

export class TableHeader extends Component {
  render() {
    const { children } = this.props;
    const columns = children.map((child, idx) => {
      const { headerRenderer: HeaderRenderer } = child.props;
      if (HeaderRenderer) {
        return (
          <th key={idx} className="table-view__header-cell" {...child.props}>
            <HeaderRenderer />
          </th>
        );
      }
      const { headerText } = child.props;
      return (
        <th key={idx} className="table-view__header-cell">
          {headerText}
        </th>
      );
    });
    return (
      <thead className="table-view__header">
        <tr className="table-view__header-row">{columns}</tr>
      </thead>
    );
  }
}

export class TableColumn extends Component {
  render() {
    console.log("TableColumn component render");
    const { headerText } = this.props;
    return <th className="table-view__header-cell">{headerText}</th>;
  }
}

TableColumn.propTypes = {
  dataField: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired
};

export class TableBodyCell extends Component {
  render() {
    console.log("TableBodyCell component render");
    const { row, dataField, column } = this.props;
    const Formatter = column.formatter;

    let classes = "table-view__body-cell ";
    if (column.className) {
      classes += String(column.className);
    }
    return (
      <td className={classes}>
        {Formatter ? (
          <Formatter input={get(row, dataField)} />
        ) : (
          get(row, dataField)
        )}
      </td>
    );
  }
}

export class TableBodyRow extends Component {
  render() {
    console.log("TableBodyRow component render");
    const { row, children, columns, onRowClick } = this.props;
    const cells = columns.map((column, idx) => {
      // const ItemRenderer2 = column.itemRenderer ? column.itemRenderer(row) : TableBodyCell;
      const { itemRenderer, className, ...rest } = column;
      if (column.itemRenderer) {
        const classes = column.className
          ? "table-view__body-cell "
          : "table-view__body-cell ";

        return (
          <td className={classes} {...rest}>
            {column.itemRenderer(row)}
          </td>
        );
      }
      const newProps = Object.assign(
        { key: idx },
        { dataField: column.dataField, column, row }
      );
      return React.createElement(TableBodyCell, newProps);
    });

    return (
      <tr className="table-view__body-row" onClick={e => onRowClick(e, row)}>
        {cells}
      </tr>
    );
  }
}

export class TableBody extends Component {
  render() {
    const { dataProvider, columns, onRowClick } = this.props;
    const rows = dataProvider.map((row, idx) => {
      if (this.props.renderExpandRow) {
        return (
          <React.Fragment>
            <TableBodyRow
              key={idx}
              row={row}
              columns={columns}
              onRowClick={onRowClick}
            />
            {this.props.renderExpandRow(row)}
          </React.Fragment>
        );
      }
      return (
        <TableBodyRow
          key={idx}
          row={row}
          columns={columns}
          onRowClick={onRowClick}
        />
      );
    });
    return <tbody className="table-view__body">{rows}</tbody>;
  }
}

class TableView extends Component {
  constructor() {
    super();
    this.grid = null;
  }

  componentDidMount() {
    this.grid.addEventListener("scroll", evt => {
      console.log("scrollTop evt", evt.target.scrollTop);
    });
  }

  render() {
    const { children, ...rest } = this.props;
    const columns = React.Children.toArray(children).map(child =>
      React.cloneElement(child, { ...rest, columns })
    );
    return (
      <div ref={grid => (this.grid = grid)} className="table-wrapper">
        {columns}
      </div>
    );
  }
}

export default TableView;
