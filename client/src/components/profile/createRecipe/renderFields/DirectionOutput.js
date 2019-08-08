import React from "react";
import { connect } from "react-redux";
import { formValueSelector, Field, getFormSyncErrors } from "redux-form";

const DirectionEditInput = ({
  input,
  label,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  pattern = null,
  addClass
}) => {
  const className = `field ${addClass} ${error && touched ? "error" : ""} ${
    active ? "input-active" : ""
  }`;
  return (
    <div className={className}>
      <label>{label}</label>
      <textarea
        style={{
          maxWidth: "18rem",
          minWidth: "18rem",
          minHeight: "7rem",
          maxHeight: "10rem"
        }}
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      ></textarea>
      {error ? <span className="error">*{error}</span> : null}
    </div>
  );
};

class DirectionOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggleEdit: false };
  }

  handleEditClick = () => {
    this.setState(prevState => {
      if (!this.props.directions.length) {
        return { toggleEdit: false };
      }
      if (this.props.syncErrors.directions) {
        return { toggleEdit: true };
      }
      return { toggleEdit: !prevState.toggleEdit };
    });
  };
  handleDeleteClick = i => {
    let modDirections = [...this.props.directions];
    modDirections.splice(i, 1);
    this.props.change(`directions`, modDirections);
    if (!modDirections.length) {
      this.setState({ toggleEdit: false });
    }
  };
  render() {
    return (
      <div style={{ display: "grid", alignItems: "center" }}>
        <div
          style={{
            justifySelf: "end",
            cursor: "pointer",
            padding: ".3rem .5rem",
            color: this.state.toggleEdit ? "#0172C4" : "inherit"
          }}
          onClick={this.handleEditClick}
        >
          Edit
        </div>
        <div
          style={{
            borderTop: "solid #E3E3E3 .01rem",
            marginBottom: "2rem",
            padding: "1rem 0",
            width: "100%",
            justifySelf: "center"
          }}
        >
          {this.props.directions.map((step, i, arr) => {
            return (
              <div key={i}>
                {this.state.toggleEdit ? (
                  <div>
                    <div
                      style={{
                        color: "red",
                        border: "solid #BFBFBF .08rem",
                        borderRadius: "100%",
                        width: "2.5rem",
                        height: "2.5rem",
                        lineHeight: "2.3rem",
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        this.handleDeleteClick(i);
                      }}
                    >
                      -
                    </div>
                    <Field
                      addClass={""}
                      name={`directions[${i}].step`}
                      component={DirectionEditInput}
                      placeholder="e.g. 1 1/2 Cup Bread Crumbs (Dry)"
                    />
                  </div>
                ) : (
                  <div>
                    <div key={i}>{step.step}</div>
                    {this.props.syncErrors.directions &&
                    this.props.syncErrors.directions[i].step ? (
                      <span className="error">
                        *{this.props.syncErrors.directions[i].step}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    directions: selector(state, "directions"),
    syncErrors: getFormSyncErrors("newRecipe")(state)
  };
};

export default connect(mapSateToProps)(DirectionOutput);
