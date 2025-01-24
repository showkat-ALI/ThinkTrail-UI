import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refresher, signin } from "../../feature/auth/authSlice";
import BrandLoader from "../utils/loaders/BrandLoader";
import { ToastContainer } from "react-toastify";
import { useGetUserQuery } from "../../feature/api/authApi";

type PageWrapperProps = {
    children: React.ReactNode
}

const PageWrapper = (props: PageWrapperProps) => {
    const { children } = props;
    const { refresh } = useAppSelector(state => state.auth);
    const { data, isSuccess, isError } = useGetUserQuery({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!refresh) {
            if (isSuccess) {
                const {_id, id, title, firstName, lastName, gender, email, phone, state, country, currentJob, studentType, status, highestStudy, avatar, roles = [], expertise = "", houseOrFlat = "", landMark = "", streetAddress = "", townOrCity = "", stateOrCountry = "", postalOrZip = "", userName = "" } = data.data.user;

                setTimeout(() => {
                    dispatch(signin(({_id, id, title, firstName, lastName, gender, email, phone, state, country, currentJob, studentType, status, highestStudy, avatar, roles, expertise, houseOrFlat, landMark, streetAddress, townOrCity, stateOrCountry, postalOrZip, userName })));
                }, 2000)
            } else if (isError) {
                // SET REFRESH TRUE AFTER 2 SEC
                setTimeout(() => {
                    dispatch(refresher());
                }, 2000)
            }
        }
    })
    return (
        <>
            <div>
                <ToastContainer />
            </div>
            {!refresh && <BrandLoader />}

            {children}
        </>
    );
};

export default PageWrapper;