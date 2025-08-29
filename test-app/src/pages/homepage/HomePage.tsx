import { useState } from "react";
import { Modal, Button, Tooltip } from "antd";
import "./HomePage.css";

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Ant Design Demo</h1>
        <p>A simple example with Modal and Tooltip components</p>
      </div>

      <div className="content-container">
        {/* Left Side - Tooltip Demo */}
        <div className="left-side">
          <div className="demo-section">
            <h2>💡 Tooltip Demo</h2>
            <div className="demo-content">
              <Tooltip title="This is a helpful tooltip! 🎯" placement="top">
                <Button type="default" size="large">
                  Hover for Tooltip
                </Button>
              </Tooltip>

              <div className="tooltip-examples">
                <Tooltip title="Tooltip on the right" placement="right">
                  <Button>Right</Button>
                </Tooltip>

                <Tooltip title="Tooltip on the bottom" placement="bottom">
                  <Button>Bottom</Button>
                </Tooltip>

                <Tooltip title="Tooltip on the left" placement="left">
                  <Button>Left</Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Modal Demo */}
        <div className="right-side">
          <div className="demo-section">
            <h2>📱 Modal Demo</h2>
            <div className="demo-content">
              <Button type="primary" onClick={showModal} size="large">
                Open Modal
              </Button>

              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="OK"
                cancelText="Cancel"
                width="80%"
                style={{ top: 20 }}
              >
                <p>This is a basic Ant Design Modal example.</p>
                <p>You can put any content here - forms, lists, images, etc.</p>
                <p>Click OK or Cancel to close the modal.</p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
