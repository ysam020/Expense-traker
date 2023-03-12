import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../styles/dashboard.css";
import DatewiseColumnChart from "./charts/DatewiseColumnChart";
import CategorywiseDonutChart from "./charts/CategorywiseDonutChart";
import ExpenseTrend from "./charts/ExpenseTrend";
import Savings from "./charts/Savings";
import MonthwiseColumnChart from "./charts/MonthwiseColumnChart";

function Dashboard() {
  return (
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
          <Col className="dashboard-col">
            <div className="chart donut-chart">
              <CategorywiseDonutChart />
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
  );
}

export default Dashboard;
