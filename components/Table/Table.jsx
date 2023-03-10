
import { useState, useEffect } from "react";
import Style from "./Table.module.css"
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

import "bootstrap/dist/css/bootstrap.min.css"
import { Title, Button } from '../componentsindex';
import BootstrapTable from "react-bootstrap-table-next";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Table = ({exchanges, isSubmitted}) => {
  const [filterType, setFilterType] = useState("all");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState(exchanges);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
setFilteredData(exchanges);
}, [exchanges])

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
      // filter: dateFilter({ fromDate: fromDate, toDate: toDate }),
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
      filter: textFilter(), 
    },
  ];

  const handleClick = () => {
      // Filter the data by date
      const filteredByDate = exchanges.filter((row) => {
        // Convert the date string to a Date object
        const rowDate = Date.parse(row.dateTime);
        const fromDatestamp = Date.parse(fromDate);
        const toDatestamp = Date.parse(toDate);
      return (rowDate >= fromDatestamp) && (rowDate <= toDatestamp);
    });
    
      // Filter the data by type
      let filteredByType;
      if(filterType === 'all'){
          filteredByType = filteredByDate
      }else{
          filteredByType = filteredByDate.filter(exchange => exchange.exchangeType === filterType);
      }
      setFilteredData(filteredByType);
    }

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
                <DatePicker format="MM-dd-y" selected={fromDate} onChange={setFromDate} className={Style.table_box_form_field} />
              </Form.Group>
              <Form.Group>
                <Form.Label>To date</Form.Label>
                <DatePicker format="MM-dd-y" selected={toDate} onChange={setToDate} className={Style.table_box_form_field} />
              </Form.Group>
              <Form.Control as="select" onChange={(e) => setFilterType(e.target.value)} className={Style.table_box_form_select}>
                
                <option value="all">All</option>
                <option value="live">Live Price</option>
                <option value="exchange">Exchange</option>
              </Form.Control>

              <div className={Style.toolbar_input_button}>
              <button
                  type="button"
                  onClick={handleClick}
                  className={Style.toolbar_input_btn_style}
                >Filter
                </button>
              </div>

            </div>
          </Form>
        </div>


        <BootstrapTable
          keyField='date'
          data={filteredData}
          columns={columns}
          pagination={pagination}
          pageSize={8}
          striped
          hover
          condensed
          wrapperClasses="table-responsive"
          filter={filterFactory()}
          className={Style.react_bootstrap_table}
        />

            {isSubmitted &&  
              <div className={Style.form_is_success}>
                  <label >
                    {isSubmitted}
                  </label>
              </div>
              }     
      </div>
    </div>
  );
}

export default Table;
