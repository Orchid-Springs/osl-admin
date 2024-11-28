import React, { useState } from "react";
import { Button, Input, message, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useFetchData } from "../hooks/useQueries";
import { api } from "../api/api";

const PromoDetailsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [promoDetails, setPromoDetails] = useState([]);

  const handleDeletePromo = async (id) => {
    api
      .delete(`/promo-detail/${id}`)
      .then((response) => {
        message.success("Promo deleted");
        setPromoDetails((prev) => {
          return prev.filter((promo) => promo._id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
        message.error("There was an error deleting space");
      });
  };

  const { isGettingPromos, refetch } = useFetchData("/promo-detail", {
    onSuccess: (data) => {
      setPromoDetails(data);
    },
  });

  const handleRefresh = () => {
    refetch();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      key: "_id",
      render: (__, _, i) => i + 1,
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "_id",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.promoCode
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record?.title.toString().toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "type",
      dataIndex: "type",
      key: "_id",
    },
    {
      title: "Code Applied",
      dataIndex: "promoCode",
      key: "_id",
    },
    {
      title: "Starting Date",
      dataIndex: "validFrom",
      key: "_id",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Ending Date",
      dataIndex: "validUntil",
      key: "_id",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return (
          <span className="flex gap-4 items-center cursor-pointer">
            <Popconfirm
              title="Delete space"
              description="Are you sure to delete this promo?"
              onConfirm={() => handleDeletePromo(id)}
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
        <Button onClick={handleRefresh} className="border-[#4096FF]">
          Refresh
        </Button>
      </div>
      <Table
        tableLayout="auto"
        bordered
        loading={isGettingPromos}
        columns={columns}
        dataSource={promoDetails}
        pagination={{
          position: ["topRight"],
        }}
      />
    </div>
  );
};
export default PromoDetailsTable;
