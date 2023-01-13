
import { useState, useEffect } from "react";
import Style from "./Table.module.css"
import paginationFactory from "react-bootstrap-table2-paginator";
import "bootstrap/dist/css/bootstrap.min.css"
import { Title, Button } from '../componentsindex';
import { useRouter } from 'next/router';
import BootstrapTable from "react-bootstrap-table-next";
import { Form, FormControl, } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Table = () => {
  // Add a state variable for the filter type and set it to an empty string
  const [exchangeData, setData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get("http://localhost:3232/save-exchange");
      const { data: { data } } = await axios.get("http://localhost:3232/exchange-rates");
      const updatedData = data.map(item=> ({
        ...item,
        amount1: 1,
        type :'Live Price'
      }))
      setData(updatedData);
      console.log(updatedData);
    };
    fetchData();
  }, []);

  // Update the current page when the user clicks on a page number
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  // Use the paginationFactory function to create a pagination component
  const pagination = paginationFactory({
    page: currentPage,
    onPageChange: handlePageChange,
  });

  const handleClick = () => {
    setFilteredData(data.filter((row) => {
      // Convert the date string to a Date object
      const rowDate = new Date(row.date);
      // Check if the type and date of the row match the selected filters
      return (!filterType || row.type === filterType) && (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);
    }));
  }


  const columns = [
    {
      dataField: "dateTime",
      text: "Date",
    },
    {
      dataField: "symbol",
      text: "Currency From",
    },
    {
      dataField: "amount1",
      default: 1,
      text: "Amount 1",
    },
    {
      dataField: "currency",
      text: "Currency To",
    },
    {
      dataField: "rate",
      text: "Amount 2",
    },
    {
      dataField: "type",
      default: 'Live data',
      text: "Type",
    },
  ];

  // const data = [
  //   {
  //     date: "2023-01-01",
  //     currencyFrom: "USD",
  //     amount1: 1000,
  //     currencyTo: "EUR",
  //     amount2: 1200,
  //     type: "Live Price",
  //   },
  //   {
  //     date: "2023-01-08",
  //     currencyFrom: "EUR",
  //     amount1: 2000,
  //     currencyTo: "GBP",
  //     amount2: 2200,
  //     type: "Exchange",
  //   },
  //   {
  //     date: "2020-01-03",
  //     currencyFrom: "GBP",
  //     amount1: 3000,
  //     currencyTo: "JPY",
  //     amount2: 3300,
  //     type: "Exchange",
  //   },
  //   {
  //     date: "2023-01-01",
  //     currencyFrom: "GBP",
  //     amount1: 3000,
  //     currencyTo: "JPY",
  //     amount2: 3300,
  //     type: "Live Price",
  //   },
  //   // ... additional data rows
  // ];



    const filteredDataArray = columns.filter((row) => {
      // Convert the date string to a Date object
      const rowDate = new Date(row.date);
      // Check if the date falls within the selected range
      return (!filterType || row.type === filterType) && (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);
    });

  return (
    <div className={Style.table_container}>
      {/* Add a dropdown menu to the form using the Form and Form.Control components */}

      <div className={Style.table_box}>
        <div className={Style.table_box_form}>
          <Form>
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
                <option value="">All</option>
                <option value="Live Price">Live Price</option>
                <option value="Exchange">Exchange</option>
              </Form.Control>



              {/* Form controls for selecting the date range */}
              {/* <Button onClick={handleClick} className={Style.table_box_form_btn}>
          Filter
        </Button> */}

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
          data={exchangeData}
          columns={columns}
          pagination={pagination}
          filteredDataArray={filteredDataArray}
          pageSize={10}
          striped
          hover
          condensed
          wrapperClasses="table-responsive"
        />

      </div>
    </div>
  );
}

export default Table;