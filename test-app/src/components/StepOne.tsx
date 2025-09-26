import { Card, Row, Col, Typography, Modal } from "antd";
import { useState } from "react";
import {
  StepValidationStatus,
  useMutateStepState,
  useNavigate,
  useStepState,
  WizzardProvider,
} from "../wizard";
import { data } from "../mock";

const { Title, Text } = Typography;

const StepOne = () => {
  const mutateStepState = useMutateStepState();
  const { nextStep } = useNavigate();
  const { state: stepState } = useStepState();
  const [open, setOpen] = useState(false);

  const handleAccountTypeSelect = (accountType: any) => {
    mutateStepState((state) => {
      return {
        ...state,
        ...accountType,
      };
    });
  };

  return (
    <>
      <Modal
        title="Account Type Selection"
        open={open}
        onOk={() => {
          nextStep();
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <p>Modal content here</p>
      </Modal>
      <WizzardProvider.Step
        onStepChange={(params) => {}}
        onFailed={(params) => {
          setOpen(true);
        }}
        onMutateStepState={({
          completed,
          uncompleted,
          invalidated,
          validate,
          prevState,
          currentState,
        }) => {
          completed();
          if (prevState && prevState?.id != currentState?.id) {
            invalidated();
          } else {
            validate();
          }
        }}
        onEnter={(params) => {
          // params.completed();
        }}
        onLeave={(params) => {}}
      >
        <div style={{ padding: "20px" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Choose Your Account Type
          </Title>

          <Row gutter={[16, 16]}>
            {data.accountType.map((accountType) => (
              <Col xs={24} sm={12} lg={6} key={accountType.id}>
                <Card
                  hoverable
                  style={{
                    height: "200px",
                    cursor: "pointer",
                    border:
                      stepState?.id === accountType.id
                        ? "2px solid #1890ff"
                        : "1px solid #d9d9d9",
                    backgroundColor:
                      stepState?.id === accountType.id ? "#f0f8ff" : "#fff",
                  }}
                  onClick={() => handleAccountTypeSelect(accountType)}
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
                      {accountType.name}
                    </Title>
                    <Text type="secondary">
                      {accountType.plan.length} plan
                      {accountType.plan.length > 1 ? "s" : ""} available
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {stepState && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Text strong>Selected: {stepState?.name}</Text>
            </div>
          )}
        </div>
      </WizzardProvider.Step>
    </>
  );
};

export { StepOne };
