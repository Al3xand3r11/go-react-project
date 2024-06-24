import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Button, Form, Container, Modal } from 'react-bootstrap'
import Entry from './single-entry.component'

const Entries = () => {

    const [entries, setEntries] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeEntry, setChangeEntry] = useState({ "change": false, "id": 0})
    const [changeColor, setChangeColor] = useState({"change": false, "id": 0})
    const [newColorName, setNewColorName] = useState("")
    const [addNewEntry, setAddNewEntry] = useState(false)
    const [newEntry, setNewEntry] = useState({"prices": 0, "car": "", "color": "", "year": "", "style": "" })

    useEffect(() => {
        getAllEntries();
    },[])

    if (refreshData){
        setRefreshData(false)
        getAllEntries()
    }

    return(
        <div>
            <Container>
                <Button onClick={()=> setAddNewEntry(true)}>Add a new vehicle</Button>
            </Container>
            <Container>
                {entries != null && entries.map((entry, i) => (
                    <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeColor={setChangeColor} setChangeEntry={setChangeEntry} />
                ))}
            </Container>
            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Year Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Car</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.car = event.target.value}}></Form.Control>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" onChange={(event) => {newEntry.prices = event.target.value}}></Form.Control>
                        <Form.Label>Color</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.color = event.target.value}}></Form.Control>
                        <Form.Label>Year</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.year = event.target.value}}></Form.Control>
                        <Form.Label>Style</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.style = event.target.value}}></Form.Control>
                    </Form.Group>
                    <Button onClick = {() => addSingleEntry()}>Add</Button>
                    <Button onClick = {() => setAddNewEntry(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>
            
            <Modal show={changeColor.change} onHide={() => setChangeColor({"change": false, "id": 0})} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Change Colors
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>new color</Form.Label>
                        <Form.Control onChange={(event) => {setNewColorName(event.target.vaule)}}></Form.Control>
                    </Form.Group>
                    <Button onClick={()=> changeColorForEntry}>Change</Button>
                    <Button onClick={()=> setChangeColor({"change": false, "id": 0})}>Cancel</Button>
                </Modal.Body>
                
            </Modal>
        

            <Modal show={changeEntry.change} onHide={()=> setChangeEntry({"change": false, "id": 0})} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Car</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.car = event.target.value}}></Form.Control>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" onChange={(event) => {newEntry.prices = event.target.value}}></Form.Control>
                        <Form.Label>Color</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.color = event.target.value}}></Form.Control>
                        <Form.Label>Year</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.year = event.target.value}}></Form.Control>
                        <Form.Label>Style</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.style = event.target.value}}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => changeSingleEntry()}>Change</Button>
                    <Button onCLick={() => setChangeEntry({"change": false, "id": 0})}>Cancel</Button>
                </Modal.Body>
            </Modal>
        </div>
    );

    function changeSingleEntry(){
        changeEntry.change = false;
        var url = "http://localhost:8000/entry/update/" + changeEntry.id;
        axios.put(url, newEntry)
        .then(response => {
            if(response.data == 200){
                setRefreshData(true)
            }
        })
    }

    function changeColorForEntry(){
        changePrice.change =false;
        var url = "http://localhost:8000/color/update/" + changeColor.id
        axios.put(url, {
            "color": newColorName
        }).then(response => {
            console.log(response.status)
            if(response.data == 200){
                setRefreshData(true)
            }
        })
    }

    function addSingleEntry(){
        setAddNewEntry(false)
        var url = "http://localhost:8000/entry/create"
        axios.post(url, {
            "prices": parseFloat(newEntry.prices),
            "car": newEntry.car,
            "color": newEntry.color,
            "year": newEntry.year,
            "style": newEntry.style,

        }).then(response => {
            if (response.status == 200){
                setRefreshData(true)
            }})
    }

    function deleteSingleEntry(id){
        var url = "http://localhost:8000/entry/delete/"
        axios.delete(url, {

        }).then(response => {
            if(response.status == 200){
                setRefreshData(true)
            }
        })
    }

    function getAllEntries(){
        var url = "http://localhost:8000/entries"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status == 200){
                setEntries(response.data)
            }
        })
    }
}

export default Entries;