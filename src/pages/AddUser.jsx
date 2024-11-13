import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { api } from '../api/api';

const AddUser = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true)
        try {
          const { data } = await api.post('/auth/register', values)
  
          if(data) message.success("User created successfully")
        } catch (error) {
          console.log(error)
          message.error(error?.response?.data?.message)
        }
        setLoading(false)
      };

  return (
        <Form layout='vertical' 
        title='Add User Form'
        form={form} 
        onFinish={onFinish}
        className='max-w-[500px] my-10 border border-[#001529]-500 p-4 rounded-lg'>
        <h2 className='text-center font-bold text-2xl'>Add User Form</h2>
        <Form.Item 
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please enter a username',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item 
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: 'Please enter an email',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item 
            label="Administrative role"
            name="role"
            rules={[
                {
                message: 'Please enter a space type',
                },
            ]}
        >
            <Select>
                <Select.Option value="super_admin">Super Admin</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item 
            label="Phone Number"
            name="phonenumber"
            rules={[
                {
                required: true,
                message: 'Please enter a phone number',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item 
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please enter a password',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Button htmlType="submit" className='bg-[#010D33] h-[40px] uppercase text-white' loading={loading} block>
            Add
        </Button>
    </Form>
  )
}

export default AddUser