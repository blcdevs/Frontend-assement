
import { useState } from "react";
import Style from "./Table.module.css"
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import "bootstrap/dist/css/bootstrap.min.css"
import { Title, Button } from '../componentsindex';
import BootstrapTable from "react-bootstrap-table-next";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Table = ({exchanges}) => {
  const [filterType, setFilterType] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Update the current page when the user clicks on a page number
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  // Use the paginationFactory function to create a pagination component
  const pagination = paginationFactory({
    page: currentPage,
    onPageChange: handlePageChange,
  });

  const columns = [
    {
      dataField: "dateTime",
      text: "Date",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "symbol",
      text: "Currency From",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "amount",
      text: "Amount 1",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "currency",
      text: "Currency To",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "rate",
      text: "Amount 2",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "exchangeType",
      text: "Type",
      // filter: textFilter(), 
    },
  ];

  const handleClick = () => {
    setFilteredData(exchanges.filter((row) => {
      // Convert the date string to a Date object
      const rowDate = new Date(row.date);
      // Check if the type and date of the row match the selected filters
      return (!filterType || row.type === filterType) && (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);
    }));
  }

    const filteredDataArray = exchanges.filter((row) => {
      // Convert the date string to a Date object
      const rowDate = new Date(row.date);
      // Check if the date falls within the selected range
      return (!filterType || row.type === filterType) && (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);
    });

  return (
    <div className={Style.table_container}>
      <div className={Style.table_box}>
         <div className={Style.customTitleStyle}>
         <Title
            heading="History"
            className={Style.customTitleStyle}
            />
         </div>
           
        <div className={Style.table_box_form}>
          <Form>
          <div className={Style.table_box_group}>
            
          </div>
            <div className={Style.table_box_group}>
              <Form.Group>
                <Form.Label>From date</Form.Label>
                <DatePicker selected={fromDate} onChange={setFromDate} className={Style.table_box_form_field} />
              </Form.Group>
              <Form.Group>
                <Form.Label>To date</Form.Label>
                <DatePicker selected={toDate} onChange={setToDate} className={Style.table_box_form_field} />
              </Form.Group>


              <Form.Control as="select" value={filterType} onChange={(event) => setFilterType(event.target.value)} className={Style.table_box_form_field}>
                
                <option value="">Select Type</option>
                <option value="Live Price">Live Price</option>
                <option value="Exchange">Exchange</option>
              </Form.Control>

              <div className={Style.toolbar_input_button}>
                <Button
                  btnName="Filter"
                  handleClick={() => handleClick()}
                  classStyle={Style.toolbar_input_btn_style}
                />
              </div>

            </div>
          </Form>
        </div>


        <BootstrapTable
          keyField='date'
          data={exchanges}
          columns={columns}
          pagination={pagination}
          filteredData={filteredDataArray}
          pageSize={8}
          striped
          hover
          condensed
          wrapperClasses="table-responsive"
          filter={filterFactory()}
          className={Style.react_bootstrap_table}
        />

      </div>
    </div>
  );
}

export default Table;
