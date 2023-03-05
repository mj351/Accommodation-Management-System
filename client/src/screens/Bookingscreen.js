import React, { useState, useEffect } from 'react'
import axios from "axios";

function Bookingscreen({ match }) {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState([]);

    useEffect(async () => {
        try {
            setloading(true);
            const data = (await axios.get('/api/rooms/getallroombyid', { roomid: match.params.roomid })).data;

            setroom(data);
            setloading(false);

        } catch (error) {
            setloading(false);
            seterror(true);
        }
    }, []);

    return (
        <div className='m-5'>
            {loading ? (
                <h1> Loading.....</h1>
            ) : error ? (
                <h1> Error.....</h1>) : (

                <div>

                    <div className="row justify-content-center mt-5 bs">

                        <div className="col-md-6">
                            <h1>{room.name}</h1>
                            <img scr={room.imgurls} className='bigimg' />
                        </div>

                        <div className="col-md-6">
                            
                            <div style={{textAlign : 'right'}}>
                            <h1>Booking Details</h1>
                            <hr />

                            <b>
                            <p>Name : {student.name} </p>
                            <p>From Data :</p>
                            <p>To Data :</p>
                            <p>Capacity:{room.capacity}</p>
                            <p></p>
                            </b>
                            </div>

                            <div style={{textAlign : 'right'}}>
                            <b>
                            <h1>Amount</h1>
                            <hr />
                            <p>Total Week: </p>
                            <p>Rent per week: {room.rentperweek}</p>
                            <p>Total Amount</p>
                            </b>
                            </div>

                            <div style={{flot: 'right'}}>
                                <button className='btn btn-primary'>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}

export default Bookingscreen;