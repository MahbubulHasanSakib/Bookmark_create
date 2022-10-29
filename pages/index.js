import {useState,useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Bookmarks from '../components/Bookmarks.jsx'
export default function Home() {
  const [show, setShow] = useState(false);
  const [allBookMarks,setAllBookMarks]=useState([])
  const [title,setTitle]=useState('')
  const [url,setUrl]=useState('')
  const [category,setCategory]=useState('Category A')
  const [showDetails,setShowDetails]=useState()
  const [isAddClicked,setisAddClicked]=useState(false)
  useEffect(()=>{
      if(localStorage.getItem('bookmarks'))
      setAllBookMarks(JSON.parse(localStorage.getItem('bookmarks')));
  },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const handleAddCat=()=>
   {
    setisAddClicked(true)
   }
   
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(title+" "+url+" "+category)
    const savedBookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    let updatedBookMarks;
    if(savedBookmarks){
     updatedBookMarks=[...savedBookmarks,{title,url,category}];
     localStorage.setItem('bookmarks', JSON.stringify(updatedBookMarks));
    }
    else
    localStorage.setItem('bookmarks', JSON.stringify([{title,url,category}]));
    setAllBookMarks(JSON.parse(localStorage.getItem('bookmarks')))

    setisAddClicked(false)

  }

  console.log("allbooks")
  console.log(allBookMarks);

  let groupBy = (array, key) => {
    return array.reduce((result, obj) => {
       (result[obj[key]] = result[obj[key]] || []).push(obj);
       return result;
    }, {});
 };
 console.log("group")
 let groupedByCategory = groupBy(allBookMarks,"category");
 
 const groupedArr=[];

 Object.keys(groupedByCategory).map((key, index)=>{
  groupedArr.push([groupedByCategory[key]])
 })

console.log(groupedArr)

const handleDetails=(item)=>{
  console.log(item)
  setShowDetails(item)
}
  return (
    <div className={styles.container}>
      <div className={styles.topDiv}>
      <h3 style={{textAlign:"center"}}>Bookmark Manager</h3>
      <button onClick={handleShow}>Add Bookmark</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bookmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupUrl">
        <Form.Label>Url</Form.Label>
        <Form.Control value={url} onChange={(e)=>setUrl(e.target.value)} type="text" placeholder="Enter URL" />
      </Form.Group>
      <div style={{display:"flex",alignItems:"center"}}>
      <Form.Group  controlId="formGridState">
          <Form.Label>Category</Form.Label>
          <Form.Select disabled={isAddClicked} value={category} onChange={(e)=>setCategory(e.target.value)} defaultValue="Category A">
            <option value="Category A">Category A</option>
            <option value="Category B">Category B</option>
            <option value="Category C">Category C</option>
          </Form.Select>
        </Form.Group>
        <Button onClick={handleAddCat}>+</Button>
      </div>
      {
          isAddClicked===true &&
          <Form.Group className="mb-3" controlId="formGroupNewCategory">
        <Form.Control  type="text" placeholder="Add New Category" />
       </Form.Group>
        }
        <Button type="submit" >Add</Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Bookmarks groupedArr={groupedArr} showDetails={showDetails} handleDetails={handleDetails}/>
       
    </div>
  )
}
