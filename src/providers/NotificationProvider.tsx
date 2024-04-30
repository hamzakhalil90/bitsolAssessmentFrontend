import React from 'react';
import { ToastContainer } from 'react-toastify';

function NotificationProvider() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme="light"
        />
    );
}

export default NotificationProvider;
