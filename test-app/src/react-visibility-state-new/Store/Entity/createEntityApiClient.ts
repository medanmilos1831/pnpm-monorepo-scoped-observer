import { createModuleInstance } from "../../core/createModuleInstance";

const createEntityApiClient = (props: any) => {
  return createModuleInstance(
    {},
    {
      api(value) {
        // function getClient() {
        //   return {};
        // }
        // const addEventListener = (
        //   event: `${ScrolliumPublicEventsType}`,
        //   callback: (payload: any) => void
        // ) => {
        //   return value.observer.subscribe(event, () => {
        //     callback(getClient());
        //   });
        // };

        return {};
      },
    }
  );
};

export { createEntityApiClient };
