import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { api } from "../api/api";
import { useFetchData } from "../hooks/useQueries";

const Spaces = () => {
  const [searchText, setSearchText] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [workingId, setWorkingId] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleAddOk = async () => {
    setAddLoading(true);

    try {
      const values = await addForm.validateFields();
      if (values) setAddModalOpen(false);

      api
        .post(`/space`, values)
        .then((data) => {
          message.success("New Space Added Succesfully");
          setSpaces((prev) => {
            return [...prev, data];
          });
          addForm.resetFields();
        })
        .catch((err) => {
          message.error("There was an error adding space");
          addForm.resetFields();
        });
    } catch (error) {
      message.error("There was an error performing operation");
    }
    setAddLoading(false);
  };

  const handleAddCancel = () => setAddModalOpen(false);
  const showAddModal = () => setAddModalOpen(true);

  const handleEditCancel = async () => {
    await editForm.resetFields();
    setEditModalOpen(false);
  };

  const showEditModal = async (id) => {
    try {
      const { data } = await api.get(`/space/${id}`);

      if (data) {
        editForm.setFieldsValue({
          name: data?.name,
          type: data?.type,
          seat_number: data?.seat_number,
          price: data?.price,
          description: data?.description,
        });
        setEditModalOpen(true);
        setWorkingId(data?._id);
      }
    } catch (error) {
      message.error("There was an error performing operation!");
    }
  };

  const handleSpaceDelete = async (id) => {
    api
      .delete(`/space/${id}`)
      .then((response) => {
        message.success("Space deleted");
        setSpaces((prev) => {
          return prev.filter((space) => space._id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
        message.error("There was an error deleting space");
      });
  };

  const handleSpaceEdit = async () => {
    try {
      setEditLoading(true);
      const values = await editForm.validateFields();
      if (workingId) {
        const { data } = await api.patch(`/space/${workingId}`, values);
        if (data) setEditModalOpen(false);
      }
    } catch (error) {
      message.error("There was an error performing operation!");
    }
    setEditLoading(false);
  };

  const { isLoading: isGettingSpace, refetch } = useFetchData("/space", {
    onSuccess: (data) => {
      setSpaces(data);
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.name.toString().toLowerCase().includes(value.toLowerCase()) ||
          record?.type.toString().toLowerCase().includes(value.toLowerCase()) ||
          record?.price
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          dayjs(record?.createdAt)
            .format("DD/MM/YYYY")
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "_id",
    },
    {
      title: "Seat Number",
      dataIndex: "seat_number",
      key: "_id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "_id",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "_id",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return (
          <span className="flex gap-4 items-center cursor-pointer">
            <EditOutlined
              className="text-lg"
              onClick={() => showEditModal(id)}
            />
            <Popconfirm
              title="Delete space"
              description="Are you sure to delete this space?"
              onConfirm={() => handleSpaceDelete(id)}
              okText="Yes"
              cancelText="No"
              okType="danger"
              className="text-red-600 text-lg"
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <div className="bg-white p-5">
        <div className="w-[80%] p-3 flex items-center gap-4">
          <Input.Search
            placeholder="Search here..."
            size="large"
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button
            onClick={showAddModal}
            type="primary"
            className="bg-[#4096ff] text-white"
          >
            Add New
          </Button>
          <Button onClick={refetch}>Refresh</Button>
        </div>
        <Table
          bordered
          columns={columns}
          pagination={{
            position: ["topRight"],
          }}
          dataSource={spaces}
          loading={isGettingSpace}
        />
      </div>
      <Modal
        title="Add New Space"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        okType="default"
        confirmLoading={addLoading}
      >
        <Form layout="horizontal" form={addForm}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter a space name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Space Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please enter a space type",
              },
            ]}
          >
            <Select>
              <Select.Option value="space">Single Spot</Select.Option>
              <Select.Option value="room">Conference room</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter a price",
              },
            ]}
          >
            <InputNumber addonBefore="₦" addonAfter=".00" />
          </Form.Item>
          <Form.Item
            label="Seat Number"
            name="seat_number"
            rules={[
              {
                required: true,
                message: "Please enter a seat number",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter a description",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Space"
        open={isEditModalOpen}
        onOk={handleSpaceEdit}
        onCancel={handleEditCancel}
        okType="default"
        okText="Save"
        confirmLoading={editLoading}
      >
        <Form layout="horizontal" form={editForm}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter a space name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Space Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please enter a space type",
              },
            ]}
          >
            <Select>
              <Select.Option value="space">Single Spot</Select.Option>
              <Select.Option value="room">Conference room</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter a price",
              },
            ]}
          >
            <InputNumber addonBefore="₦" addonAfter=".00" />
          </Form.Item>
          <Form.Item
            label="Seat Number"
            name="seat_number"
            rules={[
              {
                required: true,
                message: "Please enter a seat number",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter a description",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Spaces;
