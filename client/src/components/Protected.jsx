import React from 'react';
import PropTypes from 'prop-types';

const Protected = ({ secretData }) => (
    <div>
        <p>This page is only accessible to authenticated users.</p>
        {secretData && <p>{JSON.stringify(secretData)}</p>}
    </div>
);

Protected.propTypes = {
    secretData: PropTypes.object.isRequired
};

export default Protected;
