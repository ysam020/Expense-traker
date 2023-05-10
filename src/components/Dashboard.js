import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../styles/dashboard.scss";
import DatewiseColumnChart from "./charts/DatewiseColumnChart";
import CategorywiseDonutChart from "./charts/CategorywiseDonutChart";
import ExpenseTrend from "./charts/ExpenseTrend";
import Savings from "./charts/Savings";
import MonthwiseColumnChart from "./charts/MonthwiseColumnChart";
import Activity from "./Activity";
import { UserContext } from "../context/Context";
import CircularProgress from "@mui/material/CircularProgress";
import { ifTransactionData } from "../utils/ifTransactionData";

function Dashboard() {
  const user = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    ifTransactionData(user, setData, setLoading);
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <>
      {data.length > 0 ? (
        <>
          <Container fluid className="dashboard">
            <Row className="dashboard-row">
              <Col xs={12} lg={6} className="dashboard-col">
                <div className="chart column-chart">
                  <DatewiseColumnChart />
                </div>
              </Col>
              <Col xs={12} lg={6} className="dashboard-col">
                <div className="chart column-chart">
                  <MonthwiseColumnChart />
                </div>
              </Col>
            </Row>
          </Container>

          <Container fluid className="dashboard">
            <Row className="dashboard-row">
              <Col xs={12} lg={6} className="dashboard-col">
                <div className="chart donut-chart">
                  <CategorywiseDonutChart />
                </div>
              </Col>
              <Col xs={12} lg={6} className="dashboard-col">
                <div className="activity">
                  <Activity />
                </div>
              </Col>
            </Row>
          </Container>

          <Container fluid className="dashboard">
            <Row className="dashboard-row">
              <Col className="dashboard-col">
                <div className="chart area-chart">
                  <ExpenseTrend />
                </div>
              </Col>
            </Row>
          </Container>

          <Container fluid className="dashboard">
            <Row className="dashboard-row">
              <Col className="dashboard-col">
                <div className="chart line-chart">
                  <Savings />
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div className="dashboard-empty">
          <h2>Add a transaction to get started</h2>
        </div>
      )}
    </>
  );
}

export default Dashboard;
