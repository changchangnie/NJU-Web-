import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import LoginPage, { Username, Password, TitleSignup, TitleLogin, Submit } from '@react-login-page/page8';
import WarningMessage from "./WarningMessage";

const styles = { height: 718 };
const css = {
    '--login-bg': "#3b4465",
    "--login-color": "#fff",
    "--login-label": "#a1b4b4",
    "--login-tab": "#999",
    "--login-input": "#3b4465",
};

const LoginSignup = () => {
    const [error, setError] = useState('');
    const navigator = useNavigate();

    const handle = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const sendRequest = async (url, body) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('请求成功:', jsonResponse);
                    setError(''); // 清除错误信息
                    navigator('/project'); // 登录或注册成功后跳转到项目界面
                } else {
                    const errorResponse = await response.text();
                    console.error('请求失败:', errorResponse);
                    setError('请求失败: ' + errorResponse);
                }
            } catch (error) {
                console.error('发生错误:', error);
                setError('发生错误: ' + error.message);
            }
        };

        if (data['confirm-password'] === undefined) {
            // 登录
            const url = '/api/users/login';
            sendRequest(url, {
                email: data['e-mail'],
                password: data['password'],
            }).then(() => (1));
        } else {
            // 注册
            if (data['password'] !== data['confirm-password']) {
                return;
            }
            const url = '/api/users/register';
            sendRequest(url, {
                email: data['e-mail'],
                password: data['password'],
            }).then(() => (1));
        }
    };

    return (
        <div style={styles}>
            <form onSubmit={handle}>
                <LoginPage style={{ height: 897, ...css }}>
                    <TitleSignup>注册</TitleSignup>
                    <TitleLogin>登录</TitleLogin>
                    <Username label="邮箱" placeholder="请输入邮箱" name="e-mail" />
                    <Password label="密码" placeholder="请输入密码" name="password" />
                    <Submit keyname="submit">提交</Submit>
                    <Username panel="signup" label="邮箱" placeholder="请输入邮箱" keyname="e-mail" />
                    <Password panel="signup" label="密码" placeholder="请输入密码" keyname="password" />
                    <Password panel="signup" label="确认密码" placeholder="请输入确认密码" keyname="confirm-password" />
                    <Submit panel="signup" keyname="signup-submit">注册</Submit>
                    {<WarningMessage message={error} />}
                </LoginPage>
            </form>
        </div>
    );
};

export default LoginSignup;
