import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import { setOptionCategory } from "../select/actions/categoriesActions";
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
    category: state.categories.category,
    lang: state.navar.lang
  };
};

export default withRouter(
  connect(mapStateToProps, { setOptionCategory })(function Categories(props) {
    const classes = useStyles();
    const [menu, setMenu] = React.useState("");
    const [open, setOpen] = React.useState(false);

    if (menu === "" || menu !== "-1") {
      setMenu("-1");
    }

    if (props.category !== undefined && props.category !== "") {
      props.setOptionCategory("");
      return (
        <Redirect
          to={{
            pathname: "/query",
            state: {
              idCategory: props.category.value
            }
          }}
        />
      );
    }

    const handleChange = event => {
      if (event.target.value !== "-1") {
        setMenu(event.target.value);
        props.setOptionCategory({
          label: Object.keys(
            props.categories.find(x => x.id === event.target.value).data[
              Object.keys(
                props.categories.find(x => x.id === event.target.value).data
              )[0]
            ]
          )[0],
          value: event.target.value
        });
      }
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };
    let { categories, lang } = props;

    return (
      <form autoComplete="off" className="select-tella select-category">
        <FormControl className={classes.formControl}>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={menu}
            onChange={handleChange}
            inputProps={{
              name: "categories",
              id: "demo-controlled-open-select"
            }}
          >
            <MenuItem value="-1">
              {lang.value === "es" ? "Seleccione Categoria" : "Select Category"}
            </MenuItem>
            {categories.length > 0 &&
              categories.map(category => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {
                      Object.keys(
                        category.data[Object.keys(category.data)[0]]
                      )[0]
                    }
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </form>
    );
  })
);
