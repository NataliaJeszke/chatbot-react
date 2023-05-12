import { QuickReplyCard } from "./QuickReplyCard";

export function QuickReply(props) {
  const { replyClick } = props;
  const handleClick = (event, payload, text) => {
    replyClick.replyClick(event, payload, text);
  };

  const renderQuickReply = (reply) => {
    if (reply) {
      return reply.map((reply, i) => {
        return <QuickReplyCard key={i} click={handleClick} reply={reply} />;
      });
    } else {
      return null;
    }
  };

  return (
    <div className="col s12 m8 offset-m2 l6 offset-l3">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          <a className="btn-floating btn-large waves-effect waves-light red">
            {replyClick.speak}
          </a>
          <div id="quick-replies" className="col s10">
            {replyClick.text && <p>{replyClick.text.stringValue}</p>}
            {renderQuickReply(replyClick.payload)}
          </div>
        </div>
      </div>
    </div>
  );
}
