import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault(); // Fixed typo
        console.log("Inside Submit handler: dispatching...");
        dispatch(resetPasswordToken(email, setEmailSent, navigate));
    };

    return (
        <div className='text-white'>
            {loading ? (
                <div>Loading . . .</div>
            ) : (
                <div>
                    <h1>{!emailSent ? "Reset Your Password" : "Check Your Mail"}</h1>
                    <p>
                        {!emailSent
                            ? "Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
                            : `We have sent the reset email to ${email}`}
                    </p>

                    <form onSubmit={submitHandler}>
                        {!emailSent && (
                            <label>
                                <p>Email Address</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-black"
                                    required
                                />
                            </label>
                        )}
                        <button type="submit">
                            {!emailSent ? "Submit" : "Resend Email"}
                        </button>
                    </form>

                    <div>
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
