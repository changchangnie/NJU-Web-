import React from 'react';

const WarningMessage = ({ message }) => {
    return (
        <div style={{ color: 'red', marginTop: '10px' }}>
            {message}
        </div>
    );
};

export default WarningMessage;