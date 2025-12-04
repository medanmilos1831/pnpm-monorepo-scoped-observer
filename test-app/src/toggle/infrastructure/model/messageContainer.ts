const createMessageContainer = () => {
  let message = undefined as any;
  return {
    getMessage: () => message,
    setMessage: (props: any) => {
      message = props;
    },
  };
};

export { createMessageContainer };
