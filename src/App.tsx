// @ts-nocheck
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import formData from "./sample.json";

function App() {
  const [data, setFormData] = useState(formData);

  const handleSelectChange = (e, formElement) => {
    if (formElement.rule.value === e.target.value) {
      const elements = data.elements.map((el) => {
        if (formElement.rule.reference.indexOf(el.id) !== -1) {
          const isReferance = false;
          return { ...el, isReferance };
        }
        return el;
      });
      setFormData({ ...data, elements: [...elements] });
    }
  };

  const renderDynamicForm = () => {
    // @ts-ignore
    return data?.elements?.map((element) => {
      if (element.isReferance) {
        return;
      }
      if (element.elType === "inputType") {
        return (
          <div className="form-element form-input" key={element.id}>
            <label>{element.label}</label>
            <input
              type={element.type}
              className="form-control"
              id={element.id}
              placeholder={element.placeholder}
              value={element.value}
            />
          </div>
        );
      } else if (element.elType === "selectlist") {
        return (
          <div className="form-element" key={element.id}>
            <select
              className="form-select"
              onChange={(e) => handleSelectChange(e, element)}
            >
              <option value="">Select</option>
              {element.options.map((option) => {
                return (
                  <option value={option.value} key={option.id}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
        );
      } else if (element.elType === "radio") {
        return (
          <div className="form-element" key={element.id}>
            <div>
              <label for={element.id}>{element.label}</label>
            </div>
            {element.choices.map((option) => {
              return (
                <div className="form-check form-check-inline" key={option.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id={element.id}
                    value="option1"
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    {option.choice}
                  </label>
                </div>
              );
            })}
          </div>
        );
      } else if (element.elType === "button") {
        return (
          <div className="form-element">
            <button>{element.name}</button>
          </div>
        );
      }
    });
  };

  return (
    <div className="app-container">
      <header className="form-header">
        <h1>{formData.titel}</h1>
        <p key={formData.details}>{formData.details}</p>
      </header>
      <form className="dynamic-form">{renderDynamicForm()}</form>
    </div>
  );
}

export default App;
