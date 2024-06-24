import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Card, Row, Col } from 'react-bootstrap'

const Entry = ({entryData, setChangeColor, deleteSingleEntry, setChangeEntry}) => {
    return(
        <Card>
            <Row>
                <Col>Car:{entryData !== undefined && entryData.Car}</Col>
                <Col>Prices:{entryData !== undefined && entryData.Prices}</Col>
                <Col>Color:{entryData !== undefined && entryData.Color}</Col>
                <Col>Year:{entryData !== undefined && entryData.Year}</Col>
                <Col><Button onClick={()=> deleteSingleEntry(entryData._id)}>Delete Entry</Button></Col>
                <Col><Button onClick={()=> changeColor}>Change Colors</Button></Col>
                <Col><Button onClick={()=> changeEntry}>Change Entry</Button></Col>
            </Row>
        </Card>
    )

    function changeColor(){
        setChangeColor(
            {
                "change": true,
                "id": entryData._id

            }
        )
    }

    function changeEntry(){
        setChangeEntry(
            {
                "change": true,
                "id": entryData._id
            }
        )
    }
}

export default Entry;