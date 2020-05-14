import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./home.scss";

import { Modal, Button } from "antd";

import { _importImage, _historyHandler } from "@/utils/index";

function Home() {
  let history = useHistory();
  const [visible, setVisible] = useState(true);

  const _approvals = [
    {
      id: "登录",
      password: "lilith",
    },
  ];
  const [approvals, setApprovals] = useState(_approvals);

  const webpackContext = require.context(
    "@/assets/img/home",
    false,
    /\.(png|jpe?g|svg)$/,
  );
  const images = _importImage(webpackContext);

  return (
    <div className="home-container">
      <Modal
        className="home-modal"
        visible={visible}
        title={null}
        closable={false}
        footer={null}
        // onOk={this.handleOk}
        // onCancel={this.handleCancel}
      >
        <div className="approval-box">
          <div className="approval-box__img">
            <img src={images["logo.png"]} alt="logo" />
          </div>
          <p>选择操作</p>
          <div
            className="approval-box__account-list"
            // style={{ backgroundImage: `url(${images["car_bg.png"]})` }}
          >
            {approvals.length ? (
              <>
                {approvals.map(approval => {
                  return (
                    <div
                      key={approval.id}
                      className="approval-box__account-item clearfix"
                    >
                      <div className="account-item-box">
                        <a
                          className="account-btn"
                          onClick={() =>
                            _historyHandler({
                              jump: "/login",
                              history,
                              state: {
                                test: 123,
                              },
                            })
                          }
                        >
                          {approval.id}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>加载中...</>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
