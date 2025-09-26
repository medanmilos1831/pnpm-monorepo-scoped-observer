import { useNavigate } from "../wizard/react-intergation";
import { useStepParams } from "../wizard/react-intergation";
import { Button, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Controls = () => {
  const { nextStep, prevStep } = useNavigate();
  const { isCompleted, status } = useStepParams();
  return (
    <>
      <div>
        <p>Step is {status}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          borderTop: "1px solid #d9d9d9",
        }}
      >
        <Button
          icon={<LeftOutlined />}
          onClick={prevStep}
          disabled={false}
          style={{
            backgroundColor: "#f5f5f5",
            borderColor: "#d9d9d9",
            color: "#000",
          }}
        >
          Previous
        </Button>

        <Space>
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={nextStep}
            disabled={!isCompleted}
            style={{
              backgroundColor: isCompleted ? "#1890ff" : "#f5f5f5",
              borderColor: isCompleted ? "#1890ff" : "#d9d9d9",
              color: isCompleted ? "#fff" : "#000",
            }}
          >
            Next
          </Button>
        </Space>
      </div>
    </>
  );
};

export { Controls };
