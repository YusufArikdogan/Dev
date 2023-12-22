
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HiArrowsPointingOut, HiHeart } from "react-icons/hi2";
import { getByAdvertsPage } from "../../../src/api/adverts-service"
import { useSelector } from "react-redux";
import { Tag } from 'primereact/tag';
import { Button } from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLocation } from "react-router-dom";
import { useToast } from '../../store/providers/toast-provider';
import { HiSquares2X2, HiListBullet  } from "react-icons/hi2";
import "./properties.scss";
import SearchPanel from "./search-panel";

const Properties = () => {
  const { showToast } = useToast();
  const location = useLocation();
  const sParams = new URLSearchParams(location.search);


  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken } = useSelector(state => state.misc);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 12,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const onPage = (event) => {
    setlazyState(event);
  };
  /////////
  const getProperty = (adverts) => {

    return (
      <div className="getproperty">
        <div className="image">
          <FullImage
            className='ad-thumbnail'
            src={`data:${adverts.image?.type};base64, ${adverts.image?.data}`}
            alt={`${adverts.image?.name}`}
            preview
          />
        </div>
      </div>
    );
  };

  const getOperationButtons = (row) => {
    if (row.builtIn) return null;
    return (
      <div className='operationsButton'>
        <Button className="btn-link"  >
          <HiHeart />
        </Button>
        <Button className="btn-link" >
          <HiArrowsPointingOut />
        </Button>
      </div>
    );
  };


  const getStatus = (adverts) => (
    <Tag
      value={adverts.statusForAdvert}
      style={{ backgroundColor: getStyle(adverts.statusForAdvert) }}
    />
  );

  const getStyle = (status) => {
    const statusStyles = {
      'PENDING': '#f18506',
      'ACTIVATED': '#61c141',
      'REJECTED': '#ec4747',
    };

    return statusStyles[status] || null;
  };

  /////////


  const findAdverts = async (params) => {
    try {
      const resp = await getByAdvertsPage(params, lazyState.page, lazyState.rows);
      setAdverts(resp.content);
      setTotalRows(resp.totalElements);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    const params = {
      q: sParams.get('q') || "",
      at: sParams.get('at') || "",
      c: sParams.get('c') || "",
      ps: sParams.get('ps') || "",
      pe: sParams.get('pe') || "",
      ctry: sParams.get('ctry') || "",
      city: sParams.get('city') || "",
      dist: sParams.get('dist') || "",
    }
    findAdverts(params);
  }, [lazyState, listRefreshToken, location.search])


  ////////////////////////
  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const getImage = (row) => (
    <div style={{ padding: "0 10px" }} >
      {/* <div className="p-column-title" >Property</div> */}
      <div>{getProperty(row)}</div>
    </div>
  );

  const getTitle = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Title</span>
      {row.title}
    </div>
  );

  const getCity = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">City</span>
      {row.city.name}
    </div>
  );

  const getPrice = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Price</span>
      <p>{"$" + row.price}</p>
    </div>
  );


  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );
  ////////////////////////


  return (
    <Container className="search-container">
      <Row>
        <Col xl={4} className="mb-4 mb-lg-0">
          <div style={{ width: '100%', height: '100%' }}>
            <SearchPanel />
          </div>
        </Col>
        <Col xl={8}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <Button className="btn-link"  >
                <HiSquares2X2 size={30}/>
              </Button>
              <Button className="btn-link" >
                <HiListBullet size={30}/>
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <span>Total found : </span>
              <span>{totalRows}</span>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <div className="tr-datatable-wrapper">
              <div className="card" >

                <DataTable className='tr-datatable'
                  lazy
                  dataKey="id"
                  value={adverts}
                  paginator
                  rows={lazyState.rows}
                  totalRecords={totalRows}
                  loading={loading}
                  first={lazyState.first}
                  onPage={onPage}
                  paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
                >
                  <Column header="Property" body={getImage} headerStyle={{ width: '170px' }} >  </Column>
                  <Column header="Title" body={getTitle}></Column>
                  <Column header="City" body={getCity}></Column>
                  <Column header="Price" body={getPrice}></Column>
                  <Column header="Action" body={operationButton}></Column>

                </DataTable>
              </div>
            </div>
          </div>
        </Col>
      </Row>

    </Container >
  );
};

export default Properties;
