import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom';

const NotFoundPage = (props) => (
    <div>
        <h1>You are in biiig trouble</h1>
        <Link to="/"> Go home </Link>
    </div>
);


export default NotFoundPage;