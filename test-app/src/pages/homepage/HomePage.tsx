import { createVisibility } from "../../react-visibility-state";
import { Modal } from "antd";
import "./HomePage.css";

// Create visibility manager for demo components
const visibilityManager = createVisibility({
  keys: ["modal", "tooltip", "accordion"] as const,
});

export function HomePage() {
  return (
    <div className="home-page">
      <div className="page-header">
        <h1>React Visibility State Demo</h1>
        <p>
          A powerful and flexible visibility state management system built with
          React and TypeScript
        </p>
      </div>

      {/* Visibility State Demo Section */}
      <div className="demo-section">
        <h2>👁️ Visibility State Demo</h2>
        <div className="visibility-demos">
          {/* Modal Demo */}
          <div className="demo-card">
            <h3>Modal</h3>
            {(() => {
              const modal = visibilityManager.useVisibility("modal");
              const modalState = visibilityManager.useWatch("modal");
              return (
                <>
                  <button onClick={() => modal.open()} className="demo-btn">
                    Open Modal
                  </button>
                  <Modal
                    title="Modal Content"
                    open={modalState.state === "open"}
                    onCancel={() => modal.close()}
                    onOk={() => modal.close()}
                    okText="Close"
                    cancelButtonProps={{ style: { display: "none" } }}
                  >
                    <p>This is a modal that can be opened and closed!</p>
                    <p>
                      Using Ant Design Modal component for better UX and
                      consistency.
                    </p>
                  </Modal>
                </>
              );
            })()}
          </div>

          {/* Tooltip Demo */}
          <div className="demo-card">
            <h3>Tooltip</h3>
            <div className="tooltip-container">
              {(() => {
                const tooltip = visibilityManager.useVisibility("tooltip");
                const tooltipState = visibilityManager.useWatch("tooltip");
                return (
                  <>
                    <button
                      onMouseEnter={() => tooltip.open()}
                      onMouseLeave={() => tooltip.close()}
                      className="demo-btn"
                    >
                      Hover for Tooltip
                    </button>
                    {tooltipState.state === "open" && (
                      <div className="tooltip">
                        This is a helpful tooltip! 🎯
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Accordion Demo */}
          <div className="demo-card">
            <h3>Accordion</h3>
            <div className="accordion">
              {(() => {
                const accordion = visibilityManager.useVisibility("accordion");
                const accordionState = visibilityManager.useWatch("accordion");
                return (
                  <>
                    <button
                      onClick={() => {
                        accordionState.state === "open"
                          ? accordion.close()
                          : accordion.open();
                      }}
                      className="accordion-header"
                    >
                      Click to{" "}
                      {accordionState.state === "open" ? "close" : "open"}{" "}
                      accordion
                      <span className="accordion-icon">
                        {accordionState.state === "open" ? "▼" : "▶"}
                      </span>
                    </button>
                    {accordionState.state === "open" && (
                      <div className="accordion-content">
                        <p>
                          This is the accordion content that can be expanded and
                          collapsed!
                        </p>
                        <p>
                          You can put any content here - forms, lists, images,
                          etc.
                        </p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
