export const isSameSender = (messages, msg, i, userId) => {
  // console.log(messages, msg, i, userId);
  return (
    i < messages.length - 1 &&
    (messages[i + 1].senderId._id !== msg.senderId._id ||
      messages[i + 1].senderId._id === undefined) &&
    messages[i].senderId._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {

  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].senderId._id !== userId &&
    messages[messages.length - 1].senderId._id
  );
};

export const isSameSenderMargin = (messages, msg, i, userId) => {
  // console.log(messages, msg, i, userId);
  if (
    i < messages.length - 1 &&
    messages[i + 1].senderId._id === msg.senderId._id &&
    messages[i].senderId._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].senderId._id !== msg.senderId._id &&
      messages[i].senderId._id !== userId) ||
    (i === messages.length - 1 && messages[i].senderId._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, msg, i) => {
  return i > 0 && messages[i - 1].senderId._id === msg.senderId._id;
};
