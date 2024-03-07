import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import axios from "axios";

const TherapistHome = () => {
    const [therapistName, setTherapistName] = useState("");
    const [bookingCounts, setBookingCounts] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [startDate, setStartDate] = useState(
        new Date().toISOString().slice(0, 10).split("-")[0] +
        "-01-" +
        new Date().toISOString().slice(0, 10).split("-")[2]
    );
    const [endDate, setEndDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .slice(0, 10)
    );

    useEffect(() => {
        const fetchTherapistName = () => {
            setTherapistName(localStorage.getItem("fname"));
        };
        fetchTherapistName();
    }, []);

    useEffect(() => {
        fetchBookingCounts();
    }, [startDate, endDate]);

    const fetchBookingCounts = async () => {
        try {
            const therapistId = localStorage.getItem("therapist_id");
            const response = await axios.get(
                `http://localhost:3007/therapist/bookings/count/${therapistId}`,
                {
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                }
            );

            setTotalBookings(response.data.totalBookings);
            setBookingCounts(response.data.counts);
        } catch (error) {
            console.error("Error fetching booking counts:", error);
        }
    };

    const renderChart = () => {
        const svgWidth = 600;
        const svgHeight = 300;
        const padding = 40;
        const pointRadius = 4;

        // Calculate max count and max date
        const maxCount = Math.max(...bookingCounts.map(entry => entry.count));
        const maxDate = new Date(Math.max(...bookingCounts.map(entry => new Date(entry._id))));

        // Calculate x and y scales
        const xScale = (svgWidth - 2 * padding) / (bookingCounts.length - 1);
        const yScale = (svgHeight - 2 * padding) / maxCount;

        // Create path data
        const pathData = bookingCounts.map((entry, index) => {
            const x = padding + index * xScale;
            const y = svgHeight - padding - entry.count * yScale;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        // Create circles for data points
        const circles = bookingCounts.map((entry, index) => {
            const x = padding + index * xScale;
            const y = svgHeight - padding - entry.count * yScale;
            return <circle key={index} cx={x} cy={y} r={pointRadius} fill="blue" />;
        });

        return (
            <svg width={svgWidth} height={svgHeight}>
                <path d={pathData} fill="none" stroke="blue" strokeWidth="2" />
                {circles}
            </svg>
        );
    };

    return (
        <div className="therapist-home-container">
            <div className="therapist-banner">
                <div className="therapist-greeting">
                    <Typography variant="h2" sx={{ color: "black" }}>
                        {`Hello ${therapistName}!`}
                    </Typography>
                </div>
            </div>
            <div className="date-inputs">
                <TextField
                    id="start-date"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="end-date"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div>
                <Typography variant="h6">Total Bookings: {totalBookings}</Typography>
                {renderChart()}
            </div>
        </div>
    );
};

export default TherapistHome;
