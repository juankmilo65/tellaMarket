import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./currency.scss";
import { Currency } from "../../../config/currency";
import { setCurrency } from "./actions/currencyActions";
import { connect } from "react-redux";
import { updateRates } from "../../commons/select/actions/ratesActions";

class CurrencySelect extends Component {
  state = {
    anchorEl: null
  };

  componentDidMount() {
    const { updateRates } = this.props;
    updateRates();
  }

  render() {
    const { anchorEl } = this.state;
    const { lang, currency, currencyList, setCurrency } = this.props;
    let currencyValue = currencyList.filter(e => e.currency === currency)[0]
      .currency;
    let currencySymbol = currencyList.filter(e => e.currency === currency)[0]
      .symbol;
    const useStyles = makeStyles(theme => ({
      typography: {
        padding: theme.spacing(2)
      }
    }));
    const handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const handleSelect = currency => {
      setCurrency(currency);
      this.setState({ anchorEl: null });
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div>
        <Button
          className="currencyButton"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <span className="spanSymbol">{currencySymbol}</span>{" "}
          <span className="spanCurrency">{currencyValue}</span>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Typography className={useStyles.typography}>
            <div>
              {Currency &&
                Currency.map(item => {
                  return (
                    <ul className="orderCurrency">
                      <li>
                        <a onClick={() => handleSelect(item.currency)}>
                          <span className="spanSymbol">{item.symbol} </span>
                          <span className="spanCurrency">
                            {item[lang.value]}
                          </span>
                        </a>
                      </li>
                    </ul>
                  );
                })}
            </div>
          </Typography>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.navar.lang,
    currency: state.currency.currency,
    currencyList: state.currency.curencyList
  };
};

export default connect(mapStateToProps, {
  setCurrency,
  updateRates
})(CurrencySelect);
