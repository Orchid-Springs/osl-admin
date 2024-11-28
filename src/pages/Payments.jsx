import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import dayjs from "dayjs";
import { useFetchData } from "../hooks/useQueries";

const Payments = () => {
  const [searchText, setSearchText] = useState("");
  const [payments, setPayments] = useState([]);

  const { isLoading: paymentLoading, refetch } = useFetchData("/payment/all", {
    onSuccess: (data) => {
      setPayments(data);
    },
  });

  const columns = [
    {
      title: "#",
      dataIndex: "person_id",
      key: "_id",
      render: (__, _, i) => i + 1,
    },
    {
      title: "Name",
      dataIndex: "person_id",
      key: "_id",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.person_id?.firstname
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record?.person_id?.lastname
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record?.person_id?.email
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record?.tx_ref.toLowerCase().includes(value.toLowerCase()) ||
          dayjs(record?.createdAt)
            .format("DD/MM/YYYY")
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      render: (person) => person?.firstname + " " + person?.lastname,
    },
    {
      title: "Email",
      dataIndex: "person_id",
      render: (person) => person?.email,
      key: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "_id",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Transaction Reference",
      dataIndex: "tx_ref",
      key: "_id",
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "_id",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "_id",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div className="bg-white p-5">
      <div className="w-[80%] p-3 flex items-center gap-4">
        <Input.Search
          placeholder="Search here..."
          size="large"
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={refetch} className="border-[#4096FF]">
          Refresh
        </Button>
      </div>
      <Table
        bordered
        loading={paymentLoading}
        columns={columns}
        dataSource={payments}
        pagination={{
          position: ["topRight"],
        }}
      />
    </div>
  );
};

export default Payments;
