export const QuickReplyCard = (props) => {
  const { click } = props;
  if (click.reply.structValue.fields.payload) {
    return (
      <a
        style={{ margin: 3 }}
        href="/"
        className="btn-floating btn-large waves-effect waves-light red"
        onClick={(event) =>
          click.click(
            event,
            click.reply.structValue.fields.payload.stringValue,
            click.reply.structValue.fields.text.stringValue
          )
        }
      >
        {click.reply.structValue.fields.text.stringValue}
      </a>
    );
  } else {
    return (
      <a
        style={{ margin: 3 }}
        href={click.reply.structValue.fields.link.stringValue}
        className="btn-floating btn-large waves-effect waves-light red"
      >
        {click.reply.structValue.fields.text.stringValue}
      </a>
    );
  }
};

