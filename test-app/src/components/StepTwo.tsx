import { Card, Row, Col, Typography, Tag } from "antd";
import { useStepState, useMutateStepState, WizzardProvider } from "../wizard";

const { Title, Text } = Typography;

const StepTwo = () => {
  const { state, getStateByPath } = useStepState();
  const mutateStepState = useMutateStepState();
  const stepOneState = getStateByPath("stepOne");

  const handlePlanSelect = (plan: any) => {
    mutateStepState((state) => {
      return {
        ...state,
        ...plan,
      };
    });
  };

  const plans = stepOneState?.plan || [];

  return (
    <WizzardProvider.Step
      onMutateStepState={({ completed, uncompleted }) => {
        completed();
      }}
    >
      <div style={{ padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Choose Your Plan
        </Title>

        {stepOneState?.name && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Text type="secondary">For {stepOneState.name}</Text>
          </div>
        )}

        <Row gutter={[16, 16]}>
          {plans.map((plan: any) => (
            <Col xs={24} sm={12} lg={8} key={plan.id}>
              <Card
                hoverable
                style={{
                  height: "180px",
                  cursor: "pointer",
                  border:
                    state?.id === plan.id
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                  backgroundColor: state?.id === plan.id ? "#f0f8ff" : "#fff",
                }}
                onClick={() => handlePlanSelect(plan)}
              >
                <div
                  style={{
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Title level={4} style={{ margin: "0 0 10px 0" }}>
                    {plan.name}
                  </Title>
                  <Tag
                    color={plan.isExtraInfoRequired ? "orange" : "green"}
                    style={{ marginBottom: "10px" }}
                  >
                    {plan.isExtraInfoRequired
                      ? "Extra Info Required"
                      : "Ready to Go"}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Plan ID: {plan.id}
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {state && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Text strong>Selected: {state.name}</Text>
            {state.isExtraInfoRequired && (
              <div style={{ marginTop: "5px" }}>
                <Tag color="orange">
                  Additional information will be required
                </Tag>
              </div>
            )}
          </div>
        )}
      </div>
    </WizzardProvider.Step>
  );
};

export { StepTwo };
