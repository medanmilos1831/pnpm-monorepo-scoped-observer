import { Button, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate, useActiveStep, useStepParams } from "../wizard";

const Controls = () => {
  const { nextStep, prevStep } = useNavigate();
  const { isCompleted } = useStepParams();

  return (
    <div
      style={{
        padding: "16px",
        textAlign: "center",
        borderTop: "1px solid #f0f0f0",
        marginTop: "20px",
        backgroundColor: "#fafafa",
      }}
    >
      <Space size="middle">
        <Button icon={<LeftOutlined />} onClick={prevStep}>
          Previous
        </Button>
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={nextStep}
          disabled={!isCompleted}
        >
          Next
        </Button>
      </Space>
    </div>
  );
};

export { Controls };
