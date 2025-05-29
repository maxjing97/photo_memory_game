import React, { useState } from 'react';
import "../App.css"
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.text}>
                    Test Your Visual Memory Now
                </div>
                <h2>Select a time for the challenge</h2>
                <div style={styles.buttonContainer}>
                    <button onClick={() =>  navigate('/5select')} style={styles.button}>5s</button>
                    <button onClick={() => navigate('/30select') } style={styles.button}>30s</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderBottom: '4px solid #444',
        height: "500px"
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#eee',
    }
};