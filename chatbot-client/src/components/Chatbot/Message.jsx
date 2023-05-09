import "./Message.css"

export function Message(props) {
  return (
    <div className="col s12 m8 offset-m2 offset-l3 cards-container">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper single-msg">
          {props.speaks === "librarian" && (
            <div className="col s2">
              <a class="btn-floating btn-large waves-effect waves-light red">
                {props.speaks}
              </a>
            </div>
          )}
          <div className="col s10">
            <span className="black-text">
                {props.text}
            </span>
          </div>
          {props.speaks === "user" && (
            <div className="col s2">
              <a class="btn-floating btn-large waves-effect waves-light red">
                {props.speaks}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
