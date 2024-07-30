import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Allclients from "./Allclients";
import Allproperties from "./Allproperties";
import Adduser from "./Adduser";
import Addproperty from "./Addproperty";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Dashboard() {
  const firstname = sessionStorage.getItem("firstname");
  console.log("First name from session storage:", firstname);

  

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("clients");

  const handleSelect = (key) =>{
    setActiveTab(key);
  }

  //   const [displayAllclients, setDisplayAllclients] = useState("");
  //   const [displayAllproperties, setDisplayAllproperties] = useState("");
  //   const [displayAdduser, setDisplayAdduser] = useState("");
  //   const [displayAddproperty, setDisplayAddproperty] = useState("");

  //   const handleViewClients = () => {
  //     setDisplayAllclients(true);
  //     setDisplayAllproperties(false);
  //     setDisplayAdduser(false);
  //     setDisplayAddproperty(false);
  //   };

  //   const handleAdduser = () => {
  //     setDisplayAllclients(false);
  //     setDisplayAllproperties(false);
  //     setDisplayAdduser(true);
  //     setDisplayAddproperty(false);
  //   };

  //   const handleViewproperties = () => {
  //     setDisplayAllclients(false);
  //     setDisplayAllproperties(true);
  //     setDisplayAdduser(false);
  //     setDisplayAddproperty(false);
  //   };

  //   const handleAddProperty = () => {
  //     setDisplayAllclients(false);
  //     setDisplayAllproperties(false);
  //     setDisplayAdduser(false);
  //     setDisplayAddproperty(true);
  //   };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Row className="m-3">
        <Col sm={9}>
          <h1 className="p-2 text-center">Agent Dashboard</h1>
        </Col>
        <Col sm={3}>
          <span className="text-capitalize">Welcome back {firstname}</span>
          <Button className="m-1" variant="danger" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={handleSelect}
        id="fill-tab-example"
        className="m-3"
        fill
      >
        <Tab eventKey="clients" title="Clients">
        {activeTab === "clients" && <Allclients />}
        </Tab>
        <Tab eventKey="adduser" title="Add User">
        {activeTab === "adduser" && <Adduser />}
        </Tab>
        <Tab
          eventKey="view-properties"
          title="View properties"
        >
           {activeTab === "view-properties" && <Allproperties />}
        </Tab>
        <Tab
          eventKey="addproperty"
          title="Add Property"
        >
           {activeTab === "addproperty" && <Addproperty />}
        </Tab>
      </Tabs>

      {/* <div style={{textAlign:'center'}}>
            <Button className='m-1' variant='dark' onClick={handleViewClients}>
                Clients
            </Button>&nbsp;
            <Button className='m-1' variant='success' onClick={handleAdduser}>
                Add User
            </Button>&nbsp;
            <Button className='m-1' variant='warning' onClick={handleViewproperties}>
                View properties
            </Button>&nbsp;
            <Button className='m-1' variant='info' onClick={handleAddProperty}>
                Add Property
            </Button>&nbsp;
            <Button className='m-1' variant='danger' onClick={logout}>
                Logout
            </Button>&nbsp;
        </div> */}
{/* 
      <Allclients handleViewClients={handleViewClients} />

      <Allproperties handleViewproperties={handleViewproperties} />

      <Adduser handleAdduser={handleAdduser} />

      <Addproperty handleAddProperty={handleAddProperty} /> */}
    </div>
  );
}

export default Dashboard;
