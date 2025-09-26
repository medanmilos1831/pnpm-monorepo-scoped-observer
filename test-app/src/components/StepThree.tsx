import { WizzardProvider } from "../wizard";
import { useMutateStepState, useStepState } from "../wizard/react-intergation";
import { Card, Form, Input, Button, Space, Typography } from "antd";

const { Title, Text } = Typography;

const StepThree = () => {
  const mutateStepState = useMutateStepState();
  const stepState = useStepState();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    mutateStepState((prevState) => ({
      ...prevState,
      personalInfo: values,
    }));
  };

  return (
    <WizzardProvider.Step
      onMutateStepState={({ completed }) => {
        completed();
      }}
    >
      <div style={{ padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Personal Information
        </Title>

        <Card style={{ maxWidth: 500, margin: "0 auto" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={stepState?.personalInfo || {}}
          >
            <Form.Item
              label="First Name"
              name="fname"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lname"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save Information
                </Button>
                <Button onClick={() => form.resetFields()}>Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </WizzardProvider.Step>
  );
};

export { StepThree };
