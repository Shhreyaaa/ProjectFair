import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
      <div style={{backgroundColor:'#93b874',height:'310px',display:'flex'}}>
   <div className='container mt-3' style={{backgroundColor:'#93b874'}} >
        <div className='row mt-3'>
            <div className='col-lg-4'>
                <h4 style={{color:'#1F2937',fontWeight:'bold'}}> <i class="fa-solid fa-biohazard"></i>
                PROJECT FAIR
                </h4>
                <p className='mt-4 text-justify ' style={{color:'#1F2937'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur deserunt placeat delectus ipsa sunt tempore? Et a commodi deserunt cupiditate laudantium accusamus.</p>
                <p style={{color:'#1F2937'}}>code is licensed by luminar</p>
                <p style={{color:'#1F2937'}}>Currently v5.3.2</p>
            </div>


            <div className='col-lg-2'>
                <h5 style={{color:'#1F2937'}}>Links</h5>
                <div className='mt-4'>
                <Link className='text-decoration-none 'style={{color:'#1F2937'}} to={'/'}>Home</Link><br />
                <Link className='text-decoration-none 'style={{color:'#1F2937'}} to={'/projects'}>Projects</Link><br />
                <Link className='text-decoration-none 'style={{color:'#1F2937'}} to={'/dashboard'}>Dashboard</Link>
                </div>
            </div>
            <div className='col-lg-2'>
                <h5 style={{color:'#1F2937'}}>Guides</h5>
                <div className='mt-4'>
                <a className='text-decoration-none 'style={{color:'#1F2937'}} href="">React</a><br />
                <a className='text-decoration-none 'style={{color:'#1F2937'}} href="">React Bootstrap</a><br />
                <a className='text-decoration-none 'style={{color:'#1F2937'}} href="">React Router</a>
                </div>
            </div>
            <div className='col-lg-4'>
                <h5 style={{color:'#1F2937'}}>Contact Us</h5>
                <div className='d-flex'>
                    <input type="text" className='form-control' placeholder='enter email' />
                    <button className='btn ms-3' style={{backgroundColor:'#1F2937'}}>
                    <i className="fa-solid fa-arrow-right" style={{color:'white'}}></i>
                    </button>
                </div>
                <div className='d-flex mt-4 fs-5 align-items-center justify-content-around'>
                <a href="" style={{color:'#1F2937'}}><i className="fa-brands fa-facebook "></i></a>
                <a href="" style={{color:'#1F2937'}}><i className="fa-brands fa-twitter "></i></a>
                <a href="" style={{color:'#1F2937'}}><i className="fa-brands fa-instagram "></i></a>
                <a href="" style={{color:'#1F2937'}}><i className="fa-brands fa-linkedin "></i></a>
                <a href="" style={{color:'#1F2937'}}><i className="fa-brands fa-github "></i></a>
                <a href="" style={{color:'#1F2937'}}><i className="fa-solid fa-phone "></i></a>
                </div>
            </div>
        </div>
        <p className='text-center mt-3'style={{color:'#1F2937', fontSize:'small'}}>Copyright &copy; September 2024 Batch, Project Fair, Built with React</p>

    </div>
   </div>
    </>
  )
}

export default Footer