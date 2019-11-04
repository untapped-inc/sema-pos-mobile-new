import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {
  DataTable,
} from 'react-native-paper';

export default class CustomDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      countPerPage: 10,
      numberOfPages: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { countPerPage } = this.state;
    this.setState({
      numberOfPages: Math.ceil(data.length / countPerPage),
    });
  }

  render() {
    const {
      header, data, cellStyle, toggleDetails
    } = this.props;
    const { pageNumber, countPerPage, numberOfPages } = this.state;
    return (
      <ScrollView
        style={styles.container}
      >
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#a6c1e1', }}>
            {header.map((cell, idx) => (
              <DataTable.Title
                key={cell.id}
                style={{
                  maxWidth: cellStyle.width[idx],
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: '600' }}>{cell.title}</Text>
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {
            data && data
              .slice(pageNumber * countPerPage, (pageNumber + 1) * countPerPage)
              .map((cell, ind) => (
                <DataTable.Row
                  onPress={event => toggleDetails(event, cell)}
                  style={ind % 2 === 0 ? styles.lightCell : styles.darkCell}
                  key={ind}
                >
                  {
                    Object.keys(cell).map((cellKey, idx) => (
                      <DataTable.Cell
                        key={idx}
                        style={{
                          maxWidth: cellStyle.width[idx]
                        }}
                      >
                        {cell[cellKey]}
                      </DataTable.Cell>
                    ))
                  }
                </DataTable.Row>
              ))
          }

          <DataTable.Pagination
            page={pageNumber}
            numberOfPages={numberOfPages}
            onPageChange={(page) => { this.setState({ pageNumber: page }); }}
            label={`${pageNumber + 1} of ${numberOfPages}`}
          />
        </DataTable>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  darkCell: {
    backgroundColor: '#e6e6e6',
  },
  lightCell: {
    backgroundColor: '#fff',
  }
});
