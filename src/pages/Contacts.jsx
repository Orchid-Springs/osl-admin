import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import dayjs from "dayjs";
import EmailLink from "../components/EmailLink";
import { useFetchData } from "../hooks/useQueries";

const Contacts = () => {
  const [searchText, setSearchText] = useState("");
  const [contacts, setContacts] = useState([]);

  const { isLoading, refetch } = useFetchData("/contact", {
    onSuccess: (data) => {
      setContacts(data);
    },
  });

  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      key: "_id",
      render: (__, _, i) => i + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "_id",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.fullname
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record?.email.toString().toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "_id",
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      key: "_id",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "_id",
    },
    // {
    //   title: "Messages",
    //   dataIndex: "message",
    //   key: "_id",
    //   render: (msgs) =>
    //     msgs?.map((msg, i) => (
    //       <>
    //         <p key={i} className="text-xs">
    //           {msg}
    //         </p>{" "}
    //         <br></br>
    //       </>
    //     )),
    // },
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "_id",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "",
      dataIndex: "email",
      key: "_id",
      render: (email) => <EmailLink email={email} />,
    },
  ];
  return (
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
        <Button onClick={refetch}>Refresh</Button>
      </div>
      <Table
        tableLayout="auto"
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={contacts}
        pagination={{
          position: ["topRight"],
        }}
      />
    </div>
  );
};
export default Contacts;
