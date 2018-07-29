import React from 'react';
import { Field, reduxForm } from 'redux-form';

let LoginForm = props => {
    const { handleSubmit, errors } = props;
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errors.summary && <p>{errors.summary}</p>}
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component="input" type="password" />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;
