// import ForgotPassword from './ForgotPassword';
// import Resendemail from './Resendemail';
// import ChooseNewPassword from './ChooseNewPassword';
// import ResetComplete from './ResetComplete';
import VerifyEmail from "../../../Pages/VerifyEmail";
import { Link } from "react-router-dom";
// import VerifyEmail from './VerifyEmail';


export default function VerifyTemp({ title, desc, formtype, button }) {
    const forms = {
        // ForgotPassword: <ForgotPassword />,
        // Resendemail: <Resendemail />,
        // ChooseNewPassword: <ChooseNewPassword />,
        // ResetComplete: <ResetComplete />,
        VerifyEmail: <VerifyEmail />,
    };

    // Select the appropriate form component based on `formtype`
    const SelectedForm = forms[formtype];

    return (
        <div className="w-1/3 mx-auto align-middle">
            <div className="text-lg text-richblack-5">{title}</div>
            <div className="text-base text-richblack-200">{desc}</div>
            <div>
                {/* {SelectedForm ? SelectedForm : <div>Form not found</div>} */}
            </div>
            <div>
                <Link to="/login">
                    <button className="text-richblack-100 text-sm">Back to login</button>
                </Link>
                
            </div>
        </div>
    );
}
