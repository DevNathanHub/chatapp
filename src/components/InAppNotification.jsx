import React from 'react';

const Notification = ({ message }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: '5px',
        }}>
            {message}
        </div>
    );
};

export default Notification;
