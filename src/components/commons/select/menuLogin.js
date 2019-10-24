import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../../auth/signout/actions/signoutActions";
import { setOptionMenu } from "../select/actions/selectActions";
import login from "../../layout/img/login.png";
import "../select/select.scss";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const mapStateToProps = state => {
  return {
    lang: state.navar.lang,
    select: state.select.option
  };
};

export default withRouter(
  compose(
    firebaseConnect(),
    connect(
      mapStateToProps,
      { signOut, setOptionMenu }
    )
  )(function MenuSelect(props) {
    const classes = useStyles();
    const [menu, setMenu] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    if (menu === "") {
      setMenu("user");
    }

    if (props.select != "") {
      props.setOptionMenu("");
      return <Redirect to={props.select} />;
    }

    const handleSubmit = () => {
      const { firebase, signOut } = props;
      const fireBase = {
        firebase
      };
      signOut(fireBase);
    };

    const handleChange = event => {
      if (event.target.value === "logout") {
        handleSubmit();
      } else if (event.target.value === "createItem") {
        props.setOptionMenu("/createItem");
      }
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <form autoComplete="off" className="select-tella">
        <FormControl className={classes.formControl}>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={menu}
            onChange={handleChange}
            inputProps={{
              name: "menu",
              id: "demo-controlled-open-select"
            }}
          >
            <MenuItem value="user">
              <img src={login} />
              {props.initials}
            </MenuItem>
            <MenuItem value="createItem">
              {props.lang === "es" ? "Crear producto" : "Create product"}
            </MenuItem>
            <MenuItem value="logout">
              {props.lang === "es" ? "Cerrar session" : "Logout"}
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  })
);
