import { WizzardProvider } from "../wizard";
import { useMutateStepState, useStepState } from "../wizard/react-intergation";
import { Card, Row, Col, Typography, Modal, Button } from "antd";
import { useState } from "react";
import { accountTypes } from "../mock";

const { Title } = Typography;

const StepOne = () => {
  const mutateStepState = useMutateStepState();
  const stepState = useStepState();
  const [open, setOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(
    stepState?.accountType || null
  );

  const handleAccountTypeSelect = (accountType: string) => {
    setSelectedAccountType(accountType);
    mutateStepState((prevState) => ({
      ...prevState,
      accountType,
    }));
  };

  return (
    <>
      <Modal
        title="Account Type Selection"
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <p>Modal content here</p>
      </Modal>
      <WizzardProvider.Step
        onNext={(params) => {
        }}
        onFailed={(params) => {
          // setOpen(true);
        }}
        guardRule={({ currentState, prevState }) =>
          prevState && prevState?.id !== currentState?.id ? true : true
        }
        onMutateStepState={({ completed }) => {
          completed();
        }}
        onEnter={() => {
          // params.completed();
        }}
        onLeave={() => {
        }}
      >
        <div style={{ padding: "20px" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Choose Account Type
          </Title>

          <Row gutter={[16, 16]} justify="center">
            {accountTypes.map((type) => (
              <Col key={type.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    border:
                      selectedAccountType === type.id
                        ? "2px solid #1890ff"
                        : "1px solid #d9d9d9",
                    backgroundColor:
                      selectedAccountType === type.id ? "#f0f8ff" : "white",
                  }}
                  onClick={() => handleAccountTypeSelect(type.id)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                    {type.icon}
                  </div>
                  <Title level={4} style={{ margin: 0 }}>
                    {type.name}
                  </Title>
                  <p style={{ color: "#666", margin: "8px 0 0 0" }}>
                    {type.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </WizzardProvider.Step>
    </>
  );
};

export { StepOne };