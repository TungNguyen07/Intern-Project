import Header from "../components/Header/HeaderComponent";
import ResetPasswordComponent from "../components/User/ResetPasswordComponent";
import Footer from "../components/Layout/FooterComponent";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({}));

export default function ResetPassword() {
  const classes = useStyle();
  return (
    <React.Fragment>
      {/* <Banner /> */}
      <Header title="Reset password" />
      <ResetPasswordComponent />
      <Footer />
    </React.Fragment>
  );
}
