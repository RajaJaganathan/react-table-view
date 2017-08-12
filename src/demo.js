import TableView, {
  Columns,
  TableColumn
} from './components/table-view/table-view';

import data from './components/table-view/sample-data';

class NameRenderer extends Component {
  render() {
    const { row, dataField } = this.props;
    return (
      <td className="table-view__cell">
        <a href={`/${row[dataField]}`}>
          {row[dataField]}
        </a>
      </td>
    );
  }
}

class NameHeaderRenderer extends Component {
  render() {
    const { headerText, column } = this.props;
    return (
      <th className="table-view__header-cell">
        {headerText}
      </th>
    );
  }
}

class PriceFormatter extends Component {
  render() {
    const { input } = this.props;
    const result =
      input === null || input === undefined ? null : input.toFixed(2);
    return (
      <span>
        {result}
      </span>
    );
  }
}

const demo = () => {
  <TableView dataProvider={data}>
    <Columns>
      <TableColumn
        dataField="firstName"
        headerText="First Name"
        itemRenderer={NameRenderer}
        headerRenderer={NameHeaderRenderer}
      />
      <TableColumn
        dataField="lastName"
        headerText="Last Name"
        itemRenderer={NameRenderer}
        headerRenderer={NameHeaderRenderer}
      />
      <TableColumn
        dataField="age"
        headerText="Age"
        formatter={PriceFormatter}
      />
      <TableColumn dataField="address.city" headerText="City" />
      <TableColumn dataField="phoneNumber[0].number" headerText="Phone" />
    </Columns>
  </TableView>;
};

export default demo;
