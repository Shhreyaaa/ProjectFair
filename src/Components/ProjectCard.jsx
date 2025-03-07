import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../../services/serverUrl'


function ProjectCard({displayData}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Card style={{ width: '15rem' }} onClick={handleShow}>
      <Card.Img variant="top" src={`${SERVER_URL}/uploads/${displayData.projectImg}`} alt="" style={{height:'250px',width:'238px'}} />
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>{displayData?.title}</Card.Title>
                
      </Card.Body>
    </Card>

    

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div className='col-lg-6'>
                    <img src={`${SERVER_URL}/uploads/${displayData.projectImg}`} className='w-100' alt="" />
                </div>

                <div className='col-lg-6'>
                    <h3>{displayData.title}</h3>
                    <h4>Languages Used: <span className='text-warning'>{displayData.languages}</span></h4>
                    <h4><span className='fs-5'>{displayData.overview} </span></h4>
                </div>
            </div>

            <div className='mt-3'>
                <button className='btn btn-success me-4'style={{width:'174px'}}><i className='fa-brands fa-github'></i></button>
                <button className='btn btn-success 'style={{width:'174px'}}><i className='fa-solid fa-link'></i></button>
            </div>
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default ProjectCard