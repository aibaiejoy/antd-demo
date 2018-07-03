
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Checkbox } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];
const plainOptions = data.map(item => item.key);

class App extends React.Component {
  state = {
    selectedRowKeys: [],
    indeterminate: false,
    checkAll: false
  };
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setChangeState(selectedRowKeys);
  }
  
  setChangeState = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
      indeterminate:
      !!selectedRowKeys.length && selectedRowKeys.length < plainOptions.length,
      checkAll: selectedRowKeys.length === plainOptions.length
    });
  }
  onChange = selectedRowKeys => {
    this.setChangeState(selectedRowKeys)
  };

  onCheckAllChange = e => {
    this.setState({
      selectedRowKeys: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChange,
    };

    console.log('render, this.state.checkAll', this.state.checkAll)
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
        />
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          Check all
          </Checkbox>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
          