import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";
import MessageDialog from "./MessageDialogComponent";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "2rem",
  },
  button: {
    width: "2.9rem",
    height: "2.9rem",
  },
  infoItem: {
    marginBottom: theme.spacing(2),
  },
  datePicker: {
    marginBottom: theme.spacing(2),
    width: "fit-content",
  },
  gender: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  genderGroup: {
    display: "block",
    marginLeft: theme.spacing(2),
  },
  genderTitle: {
    marginTop: theme.spacing(2) - 2,
  },
  form: {
    width: "100%",
  },
}));

export const EditInfoComponent = ({ user, update }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(user);
  const [error, setError] = useState([]);
  const [display, setDisplay] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) setInfo(user);
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
    setError([]);
  };

  const handleClose = () => {
    setOpen(false);
    setError([]);
  };

  const handleDateChange = (date) => {
    date != "Invalid Date" &&
      setInfo({ ...info, birth_date: date.toISOString() });
  };

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    return isNaN(phone);
  };

  const checkValid = (infor) => {
    let arrError = [];
    if (!validateEmail(infor.email) || infor.email == "")
      arrError.push("Email không hợp lệ!");
    if (
      validatePhone(infor.phone_number) ||
      infor.phone_number.length < 10 ||
      infor.phone_number.length > 11
    )
      arrError.push("Số điện thoại không hợp lệ!");
    if (infor.fullname == "") arrError.push("Họ và tên không được bỏ trống!");
    if (infor.address == "") arrError.push("Địa chỉ không được bỏ trống!");
    if (infor.phone_number == "")
      arrError.push("Số điện thoại không được bỏ trống!");
    if (arrError.length) {
      setError(arrError);
      return false;
    } else return true;
  };

  const handleSave = () => {
    setError([]);
    checkValid(info) ? updateUser() : setDisplay(true);
  };

  const updateUser = () => {
    handleClose();
    setSuccess(true);
    update(info);
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          aria-label="Edit"
          component="span"
          className={classes.button}
          onClick={handleClickOpen}
        >
          <EditIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="form-dialog-title">
          Thay đổi thông tin cá nhân
        </DialogTitle>
        <DialogContent>
          <FormControl id="info" className={classes.form}>
            <TextField
              className={classes.infoItem}
              id="fullname"
              label="Họ và tên"
              variant="outlined"
              value={info.fullname}
              required
              onChange={handleChange("fullname")}
            />
            <div className={classes.gender}>
              <FormLabel className={classes.genderTitle}>Giới tính</FormLabel>
              <RadioGroup
                className={classes.genderGroup}
                aria-label="gender"
                name="gender"
                value={info.gender}
                onChange={handleChange("gender")}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio className={classes.radio} />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio className={classes.radio} />}
                  label="Nam"
                />
              </RadioGroup>
            </div>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.datePicker}
                variant="outlined"
                id="birth_date"
                label="Ngày sinh"
                format="dd/MM/yyyy"
                value={info.birth_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.infoItem}
              id="email"
              label="Email"
              variant="outlined"
              value={info.email}
              required
              onChange={handleChange("email")}
            />
            <TextField
              className={classes.infoItem}
              id="phone"
              label="Số điện thoại"
              variant="outlined"
              value={info.phone_number}
              required
              onChange={handleChange("phone_number")}
            />
            <TextField
              className={classes.infoItem}
              id="address"
              label="Địa chỉ"
              variant="outlined"
              value={info.address}
              required
              onChange={handleChange("address")}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      {display && <MessageDialog setError={setDisplay} message={error} />}
      {success && (
        <MessageDialog
          setError={setSuccess}
          message={["Cập nhật thông tin cá nhân thành công!"]}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: bindActionCreators(userActions.updateInfo, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfoComponent);
