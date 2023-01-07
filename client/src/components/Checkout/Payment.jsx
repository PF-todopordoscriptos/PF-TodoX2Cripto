import React, { useEffect, useState } from "react";
import useScript from "../../hooks/useScript";
import { formConfig } from "./formConfig";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "../../hooks/useMercadoPago";

const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
};

export default function MercadoPagoForm() {
  const [state, setState] = useState(INITIAL_STATE);
  const resultPayment = useMercadoPago();

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  return (
    <div className="container">
      <Card
        cvc={state.cvc}
        expiry={state.cardExpirationMonth + state.cardExpirationYear}
        name={state.cardholderName}
        number={state.cardNumber}
        focused={state.focus}
        brand={state.issuer}
      />
    </div>
  );
}
