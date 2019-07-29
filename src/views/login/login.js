import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./style/index.less";
import { Link } from "react-router-dom";

import http from "@/utils/http.js";
import API from "@/utils/api.js";
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http.post(`${API.login}`,values).then((res)=>{
          if(res.success){
            this.props.history.push('/main/echarts')
          }else{
            
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名，例如admin" }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码，例如123456" }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住我</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
          </a>
              <Button
                style={{ width: "100%" }}
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
          </Button>
              <div className="new-user">
                新用户？<Link to="/sign/register">现在注册</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create({ name: "normal_login" })(Login);
