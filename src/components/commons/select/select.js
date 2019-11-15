import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setLanguage } from "../../layout/actions/navarActions";
import english from "../../layout/img/english.svg";
import spanish from "../../layout/img/spanish.svg";
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

export default connect(
  null,
  { setLanguage }
)(function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [lang, setlang] = React.useState("");
  const [open, setOpen] = React.useState(false);

  if (lang === "") {
    setlang("en");
  }

  const handleChange = event => {
    setlang(event.target.value);
    props.setLanguage({
      label: event.target.value === "es" ? "ES" : "EN",
      value: event.target.value
    });
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
          value={lang}
          onChange={handleChange}
          inputProps={{
            name: "lang",
            id: "demo-controlled-open-select"
          }}
        >
          <MenuItem value="en">
            <img src={english} />
            {lang === "es" ? "Ingles" : "English"}
          </MenuItem>
          <MenuItem value="es">
            <img src={spanish} />
            {lang === "es" ? "Español" : "Spanish"}
          </MenuItem>
        </Select>
      </FormControl>
    </form>
  );
});
